const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { ConfigFileAuthenticationDetailsProvider } = require("oci-common");
const objectStorage = require("oci-objectstorage");
const profilePhotoRepository = require("../repositories/profilePhotoRepository");

const provider = new ConfigFileAuthenticationDetailsProvider();
const client = new objectStorage.ObjectStorageClient({ authenticationDetailsProvider: provider });

const NAMESPACE = process.env.OCI_BUCKET_NAMESPACE;
const BUCKET_NAME = process.env.OCI_BUCKET_NAME;
const PROFILE_PREFIX = "profile/";
const PAR_EXPIRES_HOURS = Number(process.env.PAR_EXPIRES_HOURS);

const deleteLocalFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error("[PHOTO] 로컬 임시 파일 삭제 실패:", err);
  });
};

const createParUrl = async (objectName) => {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + PAR_EXPIRES_HOURS);

  const result = await client.createPreauthenticatedRequest({
    namespaceName: NAMESPACE,
    bucketName: BUCKET_NAME,
    createPreauthenticatedRequestDetails: {
      name: `par-${Date.now()}`,
      objectName,
      accessType: "ObjectRead",
      timeExpires: expiresAt.toISOString(),
    },
  });

  return {
    parUrl: `https://objectstorage.ap-chuncheon-1.oraclecloud.com${result.preauthenticatedRequest.accessUri}`,
    expiresAt,
  };
};

const uploadProfilePhoto = async (file, userId) => {
  const uniqueName = uuidv4() + path.extname(file.originalname);
  const objectName = `${PROFILE_PREFIX}${uniqueName}`;

  await client.putObject({
    namespaceName: NAMESPACE,
    bucketName: BUCKET_NAME,
    objectName,
    putObjectBody: fs.createReadStream(file.path),
    contentType: file.mimetype,
    contentDisposition: "inline",
  });

  deleteLocalFile(file.path);

  // 기존 이미지 삭제
  await profilePhotoRepository.deleteAllProfilePhotosByUserId(userId);

  // 새 PAR 발급 및 도큐먼트 생성
  const { parUrl, expiresAt } = await createParUrl(objectName);

  await profilePhotoRepository.createProfilePhoto({
    userId,
    objectName,
    uri: `https://objectstorage.ap-chuncheon-1.oraclecloud.com/n/${NAMESPACE}/b/${BUCKET_NAME}/o/${encodeURIComponent(
      objectName
    )}`,
    parExpiresAt: expiresAt,
  });

  return parUrl;
};

const getValidProfileParUrl = async (userId) => {
  const photo = await profilePhotoRepository.findLatestProfilePhotoByUserId(userId);
  if (!photo) return null;

  const isExpired = new Date() > photo.parExpiresAt;
  if (!isExpired) return photo.parUrl;

  const { parUrl, expiresAt } = await createParUrl(photo.objectName);
  photo.parExpiresAt = expiresAt;
  await photo.save();

  return parUrl;
};

module.exports = {
  uploadProfilePhoto,
  getValidProfileParUrl,
};
