import { useEffect } from "react";
import useFetchData from "../hooks/fetchDataHook";
import {
  Building,
  CirclePlus,
  DollarSign,
  House,
  Info,
  LocateFixed,
  MapPinned,
  Search,
  TimerIcon,
  Type,
  X,
} from "lucide-react";
import SearchBtnLayout from "./SearchBtnLayout";
import { useState } from "react";
import { useActionState } from "react";
import InputFields from "./InputFields";
import usePostData from "../hooks/postDataHook";
import LoadingBar from "react-top-loading-bar";
import { useSearchParams } from "react-router-dom";

const ListProperties = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [nameField, setNameField] = useState("");
  const [typeField, setTypeField] = useState("");
  const [locationField, setLocationField] = useState("");

  const [, action, pending] = useActionState(handleFormData, null);
  const [searchParams, setSearchParams] = useSearchParams();

  //   custom hook
  const [getData, , progress] = useFetchData();
  const [postData, postError] = usePostData();

  const name = searchParams.get("name") || "";
  const type = searchParams.get("type") || "";
  const location = searchParams.get("location") || "";

  //   function for building base search url
  function buildUrl() {
    const params = new URLSearchParams();

    if (name) params.set("name", name);
    if (type && type !== "all") params.set("type", type);
    if (location) params.set("location", location);

    return `http://localhost:5000/api/property?${params.toString()}`;
  }

  //   function for handling search params
  function handleParams() {
    const name = nameField;
    const location = locationField;
    const type = typeField;

    updateSearchParams({ name, location, type });
  }

  //   function for updating the search params
  function updateSearchParams(params) {
    const currentParams = new URLSearchParams(params);

    Object.keys(params).map((key) => {
      if (params[key] && params[key] !== "all")
        currentParams.set(key, params[key]);
      else currentParams.delete(key);
    });

    // set search params
    setSearchParams(currentParams);
  }

  //   cancel search
  const handleCancelSearch = () => {
    updateSearchParams({ name: "", type: "all", location: "" });
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getData(buildUrl());
      setData(res);
    }

    fetchData();
  }, [searchParams]);

  //   create new property
  async function handleFormData(preData, formData) {
    const name = formData.get("name");
    const type = formData.get("type");
    const price = formData.get("price");
    const description = formData.get("description");
    const location = formData.get("location");
    const propertyImg = formData.get("propertyImg");

    const formPayload = new FormData();
    formPayload.append("name", name);
    formPayload.append("type", type);
    formPayload.append("price", price);
    formPayload.append("description", description);
    formPayload.append("location", location);
    formPayload.append("propertyImg", propertyImg);

    const res = await postData(
      "http://localhost:5000/api/property",
      formPayload
    );

    if (res?.data) {
      setData((prev) => [res.data, ...prev]);
    }
  }

  //   handle model open
  const handleModelOpen = (property) => {
    setSelectedProperty(property);
    setModelOpen(true);
  };

  // handle modelClose
  const handleModelClose = () => {
    setSelectedProperty(null);
    setModelOpen(false);
  };

  //   handle searchOpen
  const handleSearchOpen = () => {
    setSearchOpen(!searchOpen);
  };

  //   handle formOpen
  const handleFormOpen = () => {
    setFormOpen(!formOpen);
  };

  return (
    <>
      <LoadingBar color="#0509fa" progress={progress} />
      <section className="p-3 md:px-10 md:py-10 max-w-[1000px] mx-auto font-open-sans relative">
        {/* Heading */}
        <div className="font-open-sans text-2xl font-bold">
          <h1>Mini Property Listing Dashboard</h1>
        </div>

        {/* Searching and sorting */}
        <div className="mt-10 flex gap-3">
          <SearchBtnLayout
            isActive={searchOpen}
            icon={<Search />}
            name={"Search"}
            onClick={handleSearchOpen}
          />
          <SearchBtnLayout
            isActive={formOpen}
            icon={<CirclePlus />}
            name={"Add Propterty"}
            onClick={handleFormOpen}
          />

          <SearchBtnLayout
            isActive={formOpen}
            icon={<X />}
            name={"Cancel Search"}
            onClick={handleCancelSearch}
          />
        </div>

        {/* Showing searchMenu or Form Menu */}
        {searchOpen === true && (
          <div className="my-6 px-3 py-2 shadow rounded-md">
            <h1 className="px-3 text-xl font-medium  mb-5">Search</h1>

            <div className="flex flex-col gap-2 text-sm">
              <label htmlFor="name">Search By Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => setNameField(e.target.value)}
                placeholder="search by name..."
                className="focus:outline-none shadow px-5 py-2 bg-gray-100 text-gray-500"
              />
            </div>

            <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              <div className="w-full">
                <p className="text-sm mb-2">Search By Type</p>
                <select
                  name="type"
                  id="type"
                  onChange={(e) => setTypeField(e.target.value)}
                  className="bg-gray-100 focus:outline-none px-5 py-2 w-full rounded-md shadow text-gray-500"
                >
                  <option value="all">all</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Land">Land</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="location">Search By Location</label>
                <input
                  onChange={(e) => setLocationField(e.target.value)}
                  type="text"
                  name="location"
                  id="location"
                  placeholder="search by location..."
                  className="focus:outline-none shadow px-5 py-2 bg-gray-100 text-gray-500"
                />
              </div>
            </div>

            <div className="mt-5">
              <button
                onClick={handleParams}
                className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-800 active:scale-95 transition-transform duration-100 ease-in-out cursor-pointer"
              >
                View Properties
              </button>
            </div>
          </div>
        )}

        {formOpen === true && (
          <div className="mt-10 px-3 shadow rounded-md py-3">
            <form action={action} encType="multipart/form-data">
              {/* Form Heading */}
              <div className="mb-5">
                <h1 className="text-xl font-medium">Add Property</h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md:gap-4 ">
                {/* Name field */}
                <InputFields
                  labelId={"name"}
                  labelName={"Enter Property Name"}
                  inputType={"text"}
                  inputName={"name"}
                  inputId={"name"}
                />

                {/* type field */}
                <InputFields
                  labelId={"type"}
                  labelName={"Enter Property Type"}
                  inputType={"text"}
                  inputName={"type"}
                  inputId={"type"}
                />

                {/* Price field */}
                <InputFields
                  labelId={"price"}
                  labelName={"Enter Property Price"}
                  inputType={"number"}
                  inputName={"price"}
                  inputId={"price"}
                />

                {/* location field */}
                <InputFields
                  labelId={"location"}
                  labelName={"Enter Property Location"}
                  inputType={"text"}
                  inputName={"location"}
                  inputId={"location"}
                />
              </div>

              {/* File upload */}
              <div className="flex flex-col gap-4">
                <label htmlFor="propertyImg">Upload Img</label>
                <input
                  type="file"
                  name="propertyImg"
                  id="propertyImg"
                  placeholder="Please upload your img here"
                  className="focus:outline-none shadow px-5 py-2 bg-gray-100 text-gray-500"
                />
              </div>

              {/* description field */}
              <div className="mt-1 md:mt-4">
                <InputFields
                  labelId={"description"}
                  labelName={"Enter Property Description"}
                  inputType={"text"}
                  inputName={"description"}
                  inputId={"description"}
                />
              </div>

              {/* Showing the error */}
              {postError && (
                <p className="bg-red-600 text-white px-4 py-1 my-5 rounded-sm">
                  {postError}
                </p>
              )}

              <div className="mt-5">
                <button
                  disabled={pending}
                  type="submit"
                  className={`w-full sm:w-40 px-5 py-2 rounded-lg cursor-pointer bg-blue-600 text-white hover:bg-blue-800 active:scale-95 transition transform duration-200 ease-in ${
                    pending ? "cursor-not-allowed" : "cursor-pointer"
                  } `}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        {/* showing the data */}
        {data && data.length >= 1 ? (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.map((property) => (
              <div
                key={property._id}
                className="mt-10 shadow rounded-lg px-5 py-2"
              >
                <div>
                  <p className="text-xl font-semibold">{property.name}</p>
                </div>

                {/* description */}
                <div className="mt-5 text-sm  [&>p]:flex [&>p]:items-center [&>p]:gap-3 [&>p]:mt-2">
                  <p>
                    <span className="">
                      <Type size={16} />
                    </span>
                    <span> {property.type}</span>
                  </p>
                  <p>
                    <span className="text-blue-700">
                      <Info size={16} />
                    </span>
                    <span>
                      {property.description.slice(0, 20)}
                      {"..."}
                    </span>
                  </p>
                  <p>
                    <span className="text-green-800">
                      <DollarSign size={16} />
                    </span>
                    <span>{property.price}/-</span>
                  </p>
                  <p>
                    <span className="text-sky-700">
                      <MapPinned size={16} />
                    </span>
                    <span>{property.location}</span>
                  </p>
                </div>

                {/* Button */}
                <div className=" mt-5">
                  <button
                    onClick={() => handleModelOpen(property)}
                    className="w-full px-5 py-2 bg-blue-600 text-white rounded-lg  text-sm transition-transform duration-200 ease-in hover:bg-blue-800 hover:scale-103 active:scale-98 cursor-pointer"
                  >
                    View Property
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center text-2xl font-medium mt-10">
            <h1>NO Properties Found</h1>
          </div>
        )}

        {/* Model Component */}
        {modelOpen && selectedProperty && (
          <div className="fixed inset-0  flex items-center justify-center bg-black/10">
            <div className="w-[95%] sm:w-[600px] min-h-[400px] mx-auto bg-white rounded-sm px-3 py-2 shadow-lg ">
              {/* Heading  */}
              <div className="text-xl font-medium flex justify-between">
                <h1>View Details</h1>
                <p>
                  <button onClick={handleModelClose} className="cursor-pointer">
                    <X />
                  </button>
                </p>
              </div>

              {/* Content */}
              <div>
                <div className="flex flex-col md:flex-row gap-4 mt-5">
                  {/* Img */}
                  <div>
                    <img
                      src={`http://localhost:5000/uploads/${selectedProperty?.propertyImg}`}
                      alt="Property Image"
                      className="md:w-[300px] w-full h-[200px] object-cover rounded-xl"
                    />
                  </div>

                  <div className="[&>p]:flex [&>p]:items-center [&>p]:gap-1">
                    <p className="text-gray-600 font-medium">
                      <span>
                        <House size={20} />
                      </span>
                      <span>{selectedProperty.name}</span>
                    </p>
                    <p className="text-blue-700 text-sm mt-2">
                      <span>
                        <Building size={20} />
                      </span>
                      <span>{selectedProperty.type}</span>
                    </p>
                    <p className="text-green-700 text-sm mt-2">
                      <span>
                        <DollarSign size={20} />
                      </span>
                      <span>{selectedProperty.price}</span>
                    </p>
                    <p className="text-sky-800 text-sm mt-2">
                      <span>
                        <MapPinned size={20} />
                      </span>
                      <span>{selectedProperty.location}</span>
                    </p>
                    <p className="text-blue-500 text-sm mt-2">
                      <span>
                        <TimerIcon size={20} />
                      </span>
                      <span>{selectedProperty.createdAt.split("T")[0]}</span>
                    </p>
                  </div>
                </div>

                {/* description */}
                <div className="mt-4">
                  <p className="text-slate-600 flex items-center gap-3">
                    <span>
                      <Info size={20} />
                    </span>
                    <span> {selectedProperty.description}</span>
                  </p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ListProperties;
