import s from "./CreateBreed.module.css";
import { connect } from "react-redux";
import { useState } from "react";
import { getTemperaments } from "../redux/actions";

import picture from "../imgs/dogPicture.png";

import Navbar from "../components/Navbar";

const CreateBreed = ({ temperaments, getTemperaments }) => {
  if (temperaments.length <= 0) getTemperaments();

  let [input, setInput] = useState({
    imageUrl: "",
    name: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    lifeSpan: "",
    temperaments: [],
  });

  let [url, setUrl] = useState("");

  let [error, setError] = useState({
    imageUrl: "",
    name: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    lifeSpan: "",
    temperaments: "",
  });

  const clearErrors = (field) => {
    if (field) {
      setError({
        ...error,
        [field]: "",
      });
    } else {
      setError({
        imageUrl: "",
        name: "",
        weightMin: "",
        weightMax: "",
        heightMin: "",
        heightMax: "",
        lifeSpan: "",
        temperaments: "",
      });
    }
  };

  const handleImageInputChange = (e) => {
    clearErrors("imageUrl");
    setUrl(e.target.value);
  };

  const handleLoadImage = () => {
    clearErrors("imageUrl");

    const expression = /(http)?s?:?(\/?\/?[^"']*\.(?:png|jpg|jpeg|png|svg))/i;
    const regex = new RegExp(expression);

    if (!url) return;
    else if (!url.match(regex)) {
      setError({
        ...error,
        imageUrl: "Only supported URL image format",
      });
    } else {
      setInput({
        ...input,
        imageUrl: url,
      });
    }
  };

  const handleImageInputKey = (e) => {
    if (e.keyCode === 13) {
      handleLoadImage();
    }
  };

  const handleKeyDown = (e) => {
    let field = e.target.name;
    if (
      field === "weightMin" ||
      field === "weightMax" ||
      field === "heightMin" ||
      field === "heightMax"
    )
      field = "number";
    var keyCode = e.keyCode ? e.keyCode : e.which;
    switch (field) {
      case "name":
        if (
          keyCode !== 8 &&
          keyCode !== 9 &&
          keyCode !== 32 &&
          (keyCode < 65 || keyCode > 90)
        ) {
          e.preventDefault();
        }

        break;
      case "number":
        if (
          keyCode !== 8 &&
          keyCode !== 9 &&
          (keyCode < 48 || keyCode > 57) &&
          (keyCode < 96 || keyCode > 105)
        ) {
          e.preventDefault();
        }
        break;
      default:
        break;
    }
  };

  const validateFields = (field, value) => {
    if (field === "name") {
      if (!value) setError({ ...error, [field]: `${field} is required` });
      else if (!isNaN(value))
        setError({ ...error, [field]: "Only A-Z a-z characthers allowed" });
    }
    if (field === "weightMin" || field === "heightMin") {
      let maxField = "";
      field.includes("weight")
        ? (maxField = input.weightMax)
        : (maxField = input.heightMax);
      if (!value) setError({ ...error, [field]: `${field} is required` });
      else if (isNaN(value))
        setError({ ...error, [field]: "Only 0-9 characthers allowed" });
      else if (parseInt(value) > parseInt(maxField))
        setError({ ...error, [field]: "Min can't be greater than max" });
      else if (value.includes("."))
        setError({ ...error, [field]: "Max can't be decimal" });
      else if (parseInt(value) <= 0)
        setError({ ...error, [field]: "Min can't be less than 1" });
    }
    if (field === "weightMax" || field === "heightMax") {
      let minField = "";
      field.includes("weight")
        ? (minField = input.weightMin)
        : (minField = input.heightMin);
      if (!value) setError({ ...error, [field]: `${field} is required` });
      else if (isNaN(value))
        setError({ ...error, [field]: "Only 0-9 characthers allowed" });
      else if (parseInt(value) < parseInt(minField))
        setError({ ...error, [field]: "Max can't be less than min" });
      else if (value.includes("."))
        setError({ ...error, [field]: "Max can't be decimal" });
      else if (parseInt(value) <= 0)
        setError({ ...error, [field]: "Max can't be less than 1" });
    }
    if (field === "lifeSpan") {
      if (isNaN(value[0]))
        setError({ ...error, [field]: "Use number for years" });
      else if (!value.includes(" - "))
        setError({ ...error, [field]: "Insert a range as year - year" });
      else {
        let from = value.split(" - ")[0];
        let to = value.split(" - ")[1];
        if (isNaN(from))
          setError({ ...error, [field]: "Use number for years" });
        else if (isNaN(to))
          setError({ ...error, [field]: "Use number for years" });
        else if (parseInt(from) > parseInt(to))
          setError({ ...error, [field]: "Min can't be greater than max" });
      }
    }
  };

  const handleInputChange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    clearErrors(inputName);

    setInput({
      ...input,
      [inputName]: inputValue,
    });

    validateFields(inputName, inputValue);
  };

  const handleCheckboxInput = (e) => {
    let value = e.target.value;
    let checked = e.target.checked;

    clearErrors("temperaments");

    if (checked) {
      setInput({
        ...input,
        temperaments: [...input.temperaments, value],
      });
    } else {
      setInput({
        ...input,
        temperaments: input.temperaments.filter((t) => t !== value),
      });
    }
  };

  const handleDisabled = () => {
    let {
      name,
      weightMax,
      weightMin,
      heightMax,
      heightMin,
      lifeSpan,
      // temperaments,
    } = input;
    if (
      !name ||
      !weightMax ||
      !weightMin ||
      !heightMax ||
      !heightMin ||
      !lifeSpan
    )
      return true;
    // else if (temperaments.length <= 0) return true;
    else if (Object.values(error).some((v) => v)) return true;
    else return false;
  };

  const handleSubmit = () => {
    clearErrors("temperaments");
    clearErrors("imageUrl");
    if (url !== input.imageUrl) setError({...error, imageUrl: 'Load the URL image'})
    else if (input.temperaments.length <= 0)
      setError({ ...error, temperaments: "Select at least one temperament" });
    else {
      // 🚫❌❗ ---------------- manejar el submit para enviar los datos aca ---------------- ❗❌🚫
      console.log(input);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={s.container}>
        <div className={s.formDiv}>
          <div className={s.imageAndDataDiv}>
            <div className={s.imageSection}>
              <div className={s.imagePlaceDiv}>
                <img
                  src={input.imageUrl ? input.imageUrl : picture}
                  alt="dog"
                />
              </div>
              {error.imageUrl ? (
                <div className={`${s.errorDiv} ${s.imageErrorDiv}`}>
                  {error.imageUrl}
                </div>
              ) : null}
              <div className={s.imageInputDiv}>
                <input
                  className={`${error.imageUrl ? s.inputWithError : s.input} ${
                    s.inputImageUrl
                  }`}
                  placeholder="Image URL"
                  value={url}
                  onChange={(e) => handleImageInputChange(e)}
                  onKeyUp={(e) => handleImageInputKey(e)}
                />
                <button className={s.loadImageButton} onClick={handleLoadImage}>
                  LOAD
                </button>
              </div>
            </div>

            <div className={s.dataSection}>
              <div className={s.inputContainer}>
                <h4>
                  Name<span className={s.requiredField}>*</span>
                </h4>
                <input
                  className={`${error.name ? s.inputWithError : s.input}`}
                  placeholder="Name"
                  name="name"
                  maxLength="30"
                  value={input.name}
                  onChange={(e) => handleInputChange(e)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                {error.name ? (
                  <div className={`${s.errorDiv} ${s.singleInputErrorDiv}`}>
                    {error.name}
                  </div>
                ) : null}
              </div>

              <div className={s.inputRangeContainer}>
                <h4>
                  Weight<span className={s.requiredField}>*</span>
                </h4>
                <input
                  className={`${error.weightMin ? s.inputWithError : s.input} ${
                    s.inputRange
                  }`}
                  placeholder="Min"
                  name="weightMin"
                  maxLength="3"
                  value={input.weightMin}
                  onChange={(e) => handleInputChange(e)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                <input
                  className={`${error.weightMax ? s.inputWithError : s.input} ${
                    s.inputRange
                  }`}
                  placeholder="Max"
                  name="weightMax"
                  maxLength="3"
                  value={input.weightMax}
                  onChange={(e) => handleInputChange(e)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                {error.weightMin || error.weightMax ? (
                  <div className={`${s.errorDiv} ${s.rangeInputErrorDiv}`}>
                    {error.weightMin || error.weightMax}
                  </div>
                ) : null}
              </div>

              <div className={s.inputRangeContainer}>
                <h4>
                  Height<span className={s.requiredField}>*</span>
                </h4>
                <input
                  className={`${error.heightMin ? s.inputWithError : s.input} ${
                    s.inputRange
                  }`}
                  placeholder="Min"
                  name="heightMin"
                  maxLength="3"
                  value={input.heightMin}
                  onChange={(e) => handleInputChange(e)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                <input
                  className={`${error.heightMax ? s.inputWithError : s.input} ${
                    s.inputRange
                  }`}
                  placeholder="Max"
                  name="heightMax"
                  maxLength="3"
                  value={input.heightMax}
                  onChange={(e) => handleInputChange(e)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                {error.heightMin || error.heightMax ? (
                  <div className={`${s.errorDiv} ${s.rangeInputErrorDiv}`}>
                    {error.heightMin || error.heightMax}
                  </div>
                ) : null}
              </div>
              <div className={s.inputContainer}>
                <h4>Life Span</h4>
                <input
                  className={`${error.lifeSpan ? s.inputWithError : s.input}`}
                  placeholder="Life span"
                  name="lifeSpan"
                  maxLength="9"
                  onChange={(e) => handleInputChange(e)}
                />
                {error.lifeSpan ? (
                  <div className={`${s.errorDiv} ${s.singleInputErrorDiv}`}>
                    {error.lifeSpan}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div
            className={
              error.temperaments
                ? s.temperamentsSectionError
                : s.temperamentsSection
            }
          >
            <div className={s.temperamentsHeader}>
              <div>
                <h4>Temperaments*</h4>
              </div>
              {error.temperaments ? (
                <div className={`${s.errorDiv} ${s.temperamentsErrorDiv}`}>
                  {error.temperaments}
                </div>
              ) : null}
            </div>
            <div className={s.temperamentsContainer}>
              {temperaments
                ? temperaments.map((t, i) => {
                    return (
                      <div key={i} className={s.element}>
                        <div className={s.tempCheckDiv}>
                          <input
                            type="checkbox"
                            name="Temperaments"
                            id={t}
                            value={t}
                            onChange={(e) => handleCheckboxInput(e)}
                          />
                        </div>
                        <div className={s.tempTextDiv}>
                          <label htmlFor={t}>{t}</label>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>

        <div className={s.buttonContainer}>
          <button className={s.footerButton} onClick={() => console.log(input)}>
            Cancel
          </button>
          <button
            className={`${s.footerButton} ${s.successButton}`}
            onClick={() => handleSubmit()}
            disabled={handleDisabled() ? true : false}
          >
            Success
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  temperaments: state.temperaments,
});

const mapDispatchToProps = (dispatch) => ({
  getTemperaments: () => dispatch(getTemperaments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateBreed);
