import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
  message,
} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import axios from "../../../../axios-orders";
import {EditOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {useState} from "react";
const {TextArea} = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const Edit = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getInfo, setInfo] = useState({});
  const [fileList, setFileList] = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

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
  const handleChange = (file) => {
    setFileList(file.fileList);
  };

  function getBasee64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Зураг
      </div>
    </div>
  );
  const showModal = () => {
    if (props.info.img.length === 1) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          thumbUrl: props.info.img[0],
        },
      ]);
    } else if (props.info.img.length === 2) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          thumbUrl: props.info.img[0],
        },
        {
          uid: "-2",
          name: "image2.png",
          status: "done",
          thumbUrl: props.info.img[1],
        },
      ]);
    } else if (props.info.img.length === 3) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          thumbUrl: props.info.img[0],
        },
        {
          uid: "-2",
          name: "image2.png",
          status: "done",
          thumbUrl: props.info.img[1],
        },
        {
          uid: "-3",
          name: "image3.png",
          status: "done",
          thumbUrl: props.info.img[2],
        },
      ]);
    } else if (props.info.img.length === 4) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          thumbUrl: props.info.img[0],
        },
        {
          uid: "-2",
          name: "image2.png",
          status: "done",
          thumbUrl: props.info.img[1],
        },
        {
          uid: "-3",
          name: "image3.png",
          status: "done",
          thumbUrl: props.info.img[2],
        },
        {
          uid: "-4",
          name: "image4.png",
          status: "done",
          thumbUrl: props.info.img[3],
        },
      ]);
    }

    setInfo(props.info);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    const token = localStorage.getItem("idToken");
    const img = [];
    fileList.forEach((element) => {
      if (element.originFileObj) {
        getBasee64(element.originFileObj, (imageUrl) => img.push(imageUrl));
      } else {
        img.push(element.thumbUrl);
      }
    });
    setTimeout(() => {
      const body = {
        localId: localStorage.getItem("localId"),
        values: {
          title: values.title,
          type: values.type,
          smallTitleUp: values.smallTitleUp,
          smallTitleDown: values.smallTitleDown,
          img: img,
        },
      };
      axios
        .patch(`homeSlider/${props.data}.json?&auth=${token}`, body)
        .then((res) => {
          if (res.data.name) message.success("Success");
          props.getData();
          setIsModalOpen(false);
        })
        .catch((err) => {
          console.log("err: ", err);
          message.error("error");
          setIsModalOpen(false);
        });
    }, 800);
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        size="small"
        icon={<EditOutlined style={{display: "block"}} />}
      ></Button>
      <Modal
        title="Registation add"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          size="middle"
          initialValues={{
            remember: true,
            title: getInfo.title,
            smallTitleDown: getInfo.smallTitleDown,
            smallTitleUp: getInfo.smallTitleUp,
            type: getInfo.type,
            img: getInfo.img ? getInfo.img[0] : "",
          }}
          onFinish={onFinish}
        >
          <Upload
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 4 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancelImg}
          >
            <img alt="example" style={{width: "100%"}} src={previewImage} />
          </Modal>
          <Form.Item
            label="Гарчиг"
            name="title"
            rules={[{required: true, message: "Гарчиг аа оруулна уу!"}]}
          >
            <Input placeholder="Гарчиг" allowClear size="small" />
          </Form.Item>

          <Form.Item
            label="Гарчиг/Дээд/"
            name="smallTitleUp"
            rules={[{required: true, message: "Гарчиг/Дээд/ аа оруулна уу!"}]}
          >
            <Input placeholder="Гарчиг/Дээд/" allowClear />
          </Form.Item>

          <Form.Item
            label="Гарчиг/Доод/"
            name="smallTitleDown"
            tooltip={{title: "Заавал биш", icon: <InfoCircleOutlined />}}
            rules={[{required: false, message: "Гарчиг/Доод/ аа оруулна уу!"}]}
          >
            <Input placeholder="Гарчиг/Доод/" allowClear />
          </Form.Item>
          <Form.Item name="type" label="Төрөл">
            <Select
              defaultValue="0"
              style={{
                width: 120,
              }}
              options={[
                {
                  value: "0",
                  label: "Идэвхгүй",
                },
                {
                  value: "1",
                  label: "Идэвхтэй",
                },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{width: "100%"}}
            >
              {" "}
              Хадгалах{" "}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Edit;
