import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  
  return <ManageHotelForm  onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;

// import { useMutation } from "react-query";
// import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
// import { useAppContext } from "../contexts/AppContext";
// import * as apiClient from "../api-client";

// const AddHotel = () => {
//   const { showToast } = useAppContext();

//   const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
//     onSuccess: () => {
//       showToast({ message: "Hotel Saved!", type: "SUCCESS" });
//     },
//     onError: (error) => { // Pass the error object to the onError callback
//       console.error("Error Saving Hotel:", error);
//       // showToast({ message: "Error Saving Hotel", type: "ERROR" });
//       if (error.message.includes("500")) {
//         showToast({ message: "Backend Error: Internal Server Error", type: "ERROR" });
//       } else {
//         showToast({ message: "Error Saving Hotel", type: "ERROR" });
//       }
//     },
//   });

//   const handleSave = (hotelFormData: FormData) => {
//     mutate(hotelFormData);
//   };
  
//   return <ManageHotelForm  onSave={handleSave} isLoading={isLoading} />;
// };

// export default AddHotel;
