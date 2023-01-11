import s from "./EditBreed.module.css";
import { connect } from "react-redux";
import { useState } from "react";
import {
  getData,
  createBreed,
  updateBreed,
  getTemperaments,
  setNotification,
  showNotification,
  hideNotification,
  getBreedsByName,
} from "../redux/actions";

import Navbar from "../components/Navbar";
import { useHistory, useParams } from "react-router-dom";
import Notification from "../components/Notification";

const EditBreed = ({
  currentDog,
  getData,
  temperaments,
  getTemperaments,
  updateBreed,
  createBreed,
  getBreedsByName,
  setNotification,
  showNotification,
  hideNotification,
  notificationStatus,
}) => {
  let { id } = useParams();
  if (!currentDog) getData();
  else if (temperaments.length <= 0) getTemperaments();
  const history = useHistory();

  let [input, setInput] = useState({
    imageUrl: currentDog.image,
    name: currentDog.name,
    weightMin: currentDog.weightMin,
    weightMax: currentDog.weightMax,
    heightMin: currentDog.heightMin,
    heightMax: currentDog.heightMax,
    lifeSpan: currentDog.life_span,
    temperaments: currentDog.temperaments,
  });

  let [url, setUrl] = useState(currentDog.image);

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
    let { value, checked } = e.target;

    clearErrors("temperaments");

    if (checked) {
      setInput({
        ...input,
        temperaments: [...input.temperaments, { name: value }],
      });
    } else {
      setInput({
        ...input,
        temperaments: input.temperaments.filter((t) => t.name !== value),
      });
    }
  };

  const handleDisabled = () => {
    let { name, weightMax, weightMin, heightMax, heightMin, lifeSpan } = input;
    if (
      !name ||
      !weightMax ||
      !weightMin ||
      !heightMax ||
      !heightMin ||
      !lifeSpan
    )
      return true;
    else if (Object.values(error).some((v) => v)) return true;
    else return false;
  };

  const handleSubmit = async () => {
    clearErrors("temperaments");
    clearErrors("imageUrl");

    // console.log(id);

    if (url !== input.imageUrl)
      setError({ ...error, imageUrl: "Load the URL image" });
    else if (input.temperaments.length <= 0)
      setError({ ...error, temperaments: "Select at least one temperament" });
    else {
      try {
        let response = await updateBreed(input, id);
        if (response)
          setNotification("Success", "Successfully updated breed", "✅");
        history.push("/breeds");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div>
      <Navbar />
      {notificationStatus ? <Notification /> : null}

      {currentDog ? (
        <div className={s.container}>
          <div className={s.formDiv}>
            <div className={s.imageAndDataDiv}>
              <div className={s.imageSection}>
                <div className={s.imagePlaceDiv}>
                  <img
                    src={input.imageUrl ? input.imageUrl : currentDog.image}
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
                    className={`${
                      error.imageUrl ? s.inputWithError : s.input
                    } ${s.inputImageUrl}`}
                    placeholder="Image URL"
                    value={url}
                    onChange={(e) => handleImageInputChange(e)}
                    onKeyUp={(e) => handleImageInputKey(e)}
                  />
                  <button
                    className={s.loadImageButton}
                    onClick={handleLoadImage}
                  >
                    Load image
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
                    className={`${
                      error.weightMin ? s.inputWithError : s.input
                    } ${s.inputRange}`}
                    placeholder="Min"
                    name="weightMin"
                    maxLength="3"
                    value={input.weightMin}
                    onChange={(e) => handleInputChange(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                  />
                  <input
                    className={`${
                      error.weightMax ? s.inputWithError : s.input
                    } ${s.inputRange}`}
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
                    className={`${
                      error.heightMin ? s.inputWithError : s.input
                    } ${s.inputRange}`}
                    placeholder="Min"
                    name="heightMin"
                    maxLength="3"
                    value={input.heightMin}
                    onChange={(e) => handleInputChange(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                  />
                  <input
                    className={`${
                      error.heightMax ? s.inputWithError : s.input
                    } ${s.inputRange}`}
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
                    value={input.lifeSpan}
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
                      let isChecked = input.temperaments.some(
                        (item) => item.name === t
                      );
                      return (
                        <div key={i} className={s.element}>
                          <div className={s.tempCheckDiv}>
                            <input
                              type="checkbox"
                              name="Temperaments"
                              id={t}
                              value={t}
                              checked={isChecked}
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
            <button
              className={`${s.footerButton} ${s.cancelButton}`}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={`${s.footerButton} ${s.successButton}`}
              onClick={() => handleSubmit()}
              disabled={handleDisabled() ? true : false}
            >
              Save changes
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  notificationStatus: state.notification.status,
  temperaments: state.breeds.temperaments,
  currentDog: state.breeds.currentDog,
});

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(getData()),
  getTemperaments: () => dispatch(getTemperaments()),
  getBreedsByName: (name) => dispatch(getBreedsByName(name)),
  updateBreed: (breed, id) => dispatch(updateBreed(breed, id)),
  createBreed: (breed) => dispatch(createBreed(breed)),
  setNotification: (title, msg, ico) =>
    dispatch(setNotification(title, msg, ico)),
  showNotification: () => dispatch(showNotification()),
  hideNotification: () => dispatch(hideNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBreed);
