import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../Context/AdminContext';
import { toast } from 'react-toastify'
import axios from 'axios';
const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { adminToken, backendUrl } = useContext(AdminContext)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Doctor image is not selected!")
      }
      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address',JSON.stringify({line1:address1,line2:address2}));

      const {data}=await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{adminToken}})
      if(data.success){
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setEmail('');
        setPassword('');
        setExperience('1 Year');
        setFees('');
        setAbout('');
        setSpeciality('General physician');
        setDegree('');
        setAddress1('');
        setAddress2('');
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  return (
    <form className='m-5 w-full' onSubmit={handleSubmit}>
      <p className='mb-5 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img
              className='w-16 bg-gray-100 rounded-full cursor-pointer'
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} // replace with actual image path
              alt="Doctor"
            />
            <input
              type="file"
              id='doc-img'
              hidden
              onChange={(e) => setDocImg(e.target.files[0])}
            />
          </label>
          <p>upload doctor <br /> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input
                className='border rounded px-3 py-2'
                type="text"
                placeholder='Doctor Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input
                className='border rounded px-3 py-2'
                type="email"
                placeholder='Doctor Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input
                className='border rounded px-3 py-2'
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select
                className='border rounded px-3 py-2'
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input
                className='border rounded px-3 py-2'
                type="number"
                placeholder='Fees'
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='w-full lg:flex flex-1 flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select
                className='border rounded px-3 py-2'
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option value="General physician">General physician</option>
                <option value="Gynocologist">Gynocologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input
                className='border rounded px-3 py-2'
                type="text"
                placeholder='Education'
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input
                className='border rounded px-3 py-2'
                type="text"
                placeholder='Address one'
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                required
              />
              <input
                className='border rounded px-3 py-2'
                type="text"
                placeholder='Address two'
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea
            className='w-full px-4 pt-2 border rounded'
            placeholder='Write about doctor'
            rows={5}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
        </div>

        <button type='submit' className='px-10 py-3 text-white rounded-full bg-primary mt-1'>
          Add Doctor
        </button>
      </div>
    </form>
  )
}

export default AddDoctor
