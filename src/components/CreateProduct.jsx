import React, { useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import InputFields from "./InputFields";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    catalogNumber: "",
    description: "",
    category: "פרי",
  });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      await axios.post("http://localhost:3000/products", formData);
      toast.success("Product created successfully! 👍");
      return true;
    } catch (error) {
      toast.error(`Product create failed.\n${error.message}`);
    }
  };

  return (
    <InputFields
      submit={submit}
      formData={formData}
      setFormData={setFormData}
      loading={loading}
      setLoading={setLoading}
      editMode={false}
    />
  );
};

export default CreateProduct;
