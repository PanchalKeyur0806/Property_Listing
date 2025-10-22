import React from "react";
import { useEffect } from "react";
import useFetchData from "../hooks/fetchDataHook";
import {
  CirclePlus,
  DollarSign,
  Info,
  MapPinned,
  Search,
  Type,
} from "lucide-react";
import SearchBtnLayout from "./SearchBtnLayout";
import { useState } from "react";
import { useActionState } from "react";
import InputFields from "./InputFields";
import usePostData from "../hooks/postDataHook";
import LoadingBar from "react-top-loading-bar";

const ListProperties = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [data, setData] = useState([]);

  const [, action, pending] = useActionState(handleFormData, null);

  //   custom hook
  const [getData, , progress] = useFetchData();
  const [postData, postError, postProgress] = usePostData();

  useEffect(() => {
    async function fetchData() {
      const res = await getData("http://localhost:5000/api/property");
      setData(res);
    }

    fetchData();
  }, []);

  async function handleFormData(preData, formData) {
    const name = formData.get("name");
    const type = formData.get("type");
    const price = formData.get("price");
    const description = formData.get("description");
    const location = formData.get("location");

    const res = await postData("http://localhost:5000/api/property", {
      name,
      type,
      price,
      description,
      location,
    });

    if (res?.data) {
      setData((prev) => [res.data, ...prev]);
    }
  }

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
      <section className="p-3 md:px-10 md:py-10 max-w-[1000px] mx-auto font-open-sans">
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
        </div>

        {/* Showing searchMenu or Form Menu */}
        {formOpen === true && (
          <div className="mt-10 px-3">
            <form action={action}>
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
                  <button className="w-full px-5 py-2 bg-blue-600 text-white rounded-lg  text-sm transition-transform duration-200 ease-in hover:bg-blue-800 hover:scale-103 active:scale-98 cursor-pointer">
                    View Property
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1>NO Properties Found</h1>
          </div>
        )}
      </section>
    </>
  );
};

export default ListProperties;
