import { Button, Modal, Upload, message } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "../../../../axios-orders";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const BackgroundImage = ({
  getDataFunc,
  getChristmaskey,
  getData,
  updateChristmas,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [bgImg, setBgImg] = useState("");

  const showModal = () => {
    // tabValue: 1 = english | 2 = mongol
    // updateChristmas: true = update | false = save
    setIsModalOpen(true);
  };

  function getBasee64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const handleOk = () => {
    if (fileList.length === 0) {
      return message.error("Зураг заавал оруулна уу!");
    }
    // setIsModalOpen(false);
    // updateChristmas: true = update | false = save
    if (updateChristmas) {
      const token = localStorage.getItem("idToken");
      const body = {
        localId: localStorage.getItem("localId"),
        values: { ...getData, homeBgImgFull: bgImg },
      };
      axios
        .patch(`christmastTheme/${getChristmaskey}.json?&auth=${token}`, body)
        .then((res) => {
          setIsModalOpen(false);
          getDataFunc();
          message.success("Амжилттай");
        })
        .catch((err) => {
          console.log("err: ", err);
          message.error("error");
          setIsModalOpen(false);
        });
    } else {
      // updateChristmas: true = update | false = save
      const token = localStorage.getItem("idToken");
      const body = {
        localId: localStorage.getItem("localId"),
        values: {
          titleMn: getData.titleMn,
          titleEng: getData.titleEng,
          subTitleMn: getData.subTitleMn,
          subTitleEng: getData.subTitleEng,
          buttonNameMn: getData.buttonNameMn,
          buttonNameEng: getData.buttonNameEng,
          homeBgImgFull: bgImg,
        },
      };
      setTimeout(() => {
        axios
          .post(`christmastTheme.json?&auth=${token}`, body)
          .then((res) => {
            // if (res.data.name) message.success("Амжилттай");
            getDataFunc();
            message.success("Амжилттай");
          })
          .catch((err) => {
            message.error("Амжилтгүй");
          })
          .finally(() => {
            // setBtnLoad(false);
          });
      }, 800);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelImg = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Зураг</div>
    </div>
  );
  const handleChange = (file) => {
    setFileList(file.fileList);
    getBasee64(file.fileList[0].originFileObj, (imageUrl) => {
      setBgImg(imageUrl);
    });
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        + Баннерын зураг солих / 1920х850 /
      </Button>
      <Modal
        title="Баннерын зураг солих"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Upload
          listType="picture-circle"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancelImg}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Modal>
    </div>
  );
};
export default BackgroundImage;
