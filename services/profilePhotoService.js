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

const uploadProfilePhoto = async (file) => {
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

  const { parUrl, expiresAt } = await createParUrl(objectName);

  const photo = await profilePhotoRepository.createInternalProfilePhoto({
    objectName,
    uri: parUrl,
    parExpiresAt: expiresAt,
  });

  return photo._id;
};

const getValidProfileParUrl = async (photoId) => {
  const photo = await profilePhotoRepository.findPhotoById(photoId);
  if (!photo) return null;

  if (photo.source === "kakao") return photo.uri;

  const isExpired = new Date() > photo.parExpiresAt;
  if (!isExpired) return photo.uri;

  const { parUrl, expiresAt } = await createParUrl(photo.objectName);
  photo.uri = parUrl;
  photo.parExpiresAt = expiresAt;
  await photo.save();

  return parUrl;
};

module.exports = {
  uploadProfilePhoto,
  getValidProfileParUrl,
};
