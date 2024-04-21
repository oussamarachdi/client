import React, { useState } from 'react'
import '../Styles/DonationPage.css'
import MyDateRangePicker from '../components/DateRangePicker'
import MyMap from '../components/MyMap'
import axios from "axios"
import DragDropImageUploader from '../components/DragDropImageUploader'

const DonationPage = () => {
  const [type, setType] = useState('');
  const [images, setImages] = useState([]);
  const [phone, setPhone] = useState('');
  const [availableTime, setAvailableTime] = useState({
    startDate: '',
    endDate: ''
  });
  const [address, setAddress] = useState({
    lat: '',
    lng: ''
  });
  const [errors, setErrors] = useState({
    inValidType: '',
    inValidImage: '',
    inValidPhoneNumber: '',
    EmptyFields: '',
    inValidAvailableTime: ''
  });

  const handleAddress = (data) => {
    setAddress({
      lat: data[0],
      lng: data[1]
    });
  };

  const handleAvailableTime = (data) => {
    setAvailableTime({
      startDate: data[0],
      endDate: data[1]
    });
  };

  const handleImageChange = (selectedImages) => {

    const validImages = selectedImages.filter((image) => image.type.startsWith('image/'));
    if(validImages.length !== selectedImages.length){
      setErrors({...errors, inValidImage:"Invalid image type.Please Select Only Images"})
      return;
    }
    setImages([...images, selectedImages])
    console.log(images)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    // VERIFY THE SUBMISSION
  
    // Initialize error object
    let newErrors = {
      inValidType: '',
      inValidImage: '',
      inValidPhoneNumber: '',
      EmptyFields: '',
      inValidAvailableTime: ''
    };
  
    // Check for empty fields
    if (!type || !phone || !address.lat || !address.lng) {
      newErrors.EmptyFields = 'You should Fill The Required Fields!!!';
    }
  
    // Check if the Number is Valid
    if (isNaN(phone) || phone.length !== 8) {
      newErrors.inValidPhoneNumber = "Phone Number Not Valid Please Enter It Correctly";
    }
  
    // Check if the available time is Valid
    const today = new Date();


    const startDay = new Date(availableTime.startDate);

    const endDay = new Date(availableTime.endDate);




    if (startDay.getTime() < today.getTime() || endDay.getTime() < today.getTime()) {
      newErrors.inValidAvailableTime = "Date Invalid"; // If either start or end date is in the future
    }
  
    // Check if the image extension is valid
    if (!(images.length === 0)) {
      for (const image of images) {
        if (!image.type || !image.type.startsWith('image/')) {
          newErrors.inValidImage = "Invalid image type. Please select only image files.";
          break;
        }
      }
    }
    // Set the errors state once
    setErrors(newErrors);

    // Calculate number of errors
    let nbError = 0
    let errorArray = Object.values(newErrors)
    for(let i=0; i<errorArray.length; i++){
      if(errorArray[i] !== ''){
        nbError = nbError + 1 
      }
    }
   

    // Condition if the Submission is Valid or Not
    if (!(nbError > 0)) {

      try{
        const formData = new FormData();
        formData.append('type', type);
        formData.append('address', JSON.stringify(address)); // Convert to JSON if it's an object
        formData.append('tel', phone);
        formData.append('startDate', availableTime.startDate);
        formData.append('endDate', availableTime.endDate);
        images.forEach((image) => {
          formData.append('img', image)
        }); // Assuming imageFile is a File object

        const response = await axios.post("http://localhost:4000/api", formData,{      
          headers : {
            'Content-Type':'multipart/form-data'
          }
        })
        console.log(response.data)
      } catch(error){
        console.log(error);
      }
      
      
    }
  };

  
  return (
    <div>
      <div className='header'>
        <h1>About Us</h1>
      </div>
      <section className='Donation-Section'>


        <div className='donation-information'>
          <h3>Donation Informations</h3>
        <form  onSubmit={handleSubmit}  encType='multipart/form-data'>
        <select name='typeDon' id='typeDon' onChange={(event) => setType(event.target.value)}>
            <option value="">Type Of Donation</option>
            <option value="Medicament">Medicament</option>
            <option value="Vetement">Vetement</option>
          </select>
          <DragDropImageUploader onImageChange={handleImageChange}/>
          <div>
            <label htmlFor='img'>Images Of The Donation : </label>
            <input type='file' id='img' name='img' onChange={handleImageChange} multiple/>
            {(errors.inValidImage && !errors.EmptyFields) ? <span>{errors.inValidImage}</span> : ''}
          </div>
          <label htmlFor='phone'>Phone Number : </label>
          <input type='text' id='phone' name='phone' placeholder='+216 (XXX) XXX-XXXX' onChange={(event) => setPhone(event.target.value)}/>
          {(errors.inValidPhoneNumber && !errors.EmptyFields) ? <span>{errors.inValidPhoneNumber}</span> : ''}
          <div className='date'>
            <label htmlFor='time'>Available Time :</label>
            <MyDateRangePicker onDateChange={handleAvailableTime}/>
            {(errors.inValidAvailableTime && !errors.EmptyFields) ? <span>{errors.inValidAvailableTime}</span> : ''}
          </div>
          <div>
            <MyMap onAdressChange={handleAddress}/>
          </div>
          {errors.EmptyFields ? <span>{errors.EmptyFields}</span> : ''}
          <input type='submit' className='btn-submit' value="Submit"/>
        </form>
          
        </div>
        
        
        
      </section>
    </div>
  )
}

export default DonationPage