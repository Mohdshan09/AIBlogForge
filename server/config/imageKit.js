import ImageKit from "imagekit";

const imageKit = new ImageKit({
  publicKey: process.env.public_Key,
  privateKey: process.env.private_Key,
  urlEndpoint: process.env.imageKit_URL,
});

export default imageKit;
