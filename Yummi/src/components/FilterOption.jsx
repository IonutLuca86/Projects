/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './FilterOption.css'
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';

const OptButton = (props) => {
    const [clicked,setClicked] = useState(false);
    useEffect(() => {
        checkClicked();
    },[clicked])
    function checkClicked() {
        const check =JSON.parse(localStorage.getItem(`${props.name}button`));
        if(check) 
            setClicked(true);  
    }

    function handleClick() {
        if(clicked === true) {
            setClicked(false);
            props.updateOptions(props.name,props.title);
            localStorage.removeItem(`${props.name}button`);
                   
        }
        else if(clicked === false) {
            setClicked(true);
            props.updateOptions(props.name,props.title);
            localStorage.setItem(`${props.name}button`,JSON.stringify(true));
            }  
        
            
      }
    return (
        <button  onClick={() => handleClick()} className={clicked? "option-button-clicked":"option-button"} >{props.name}</button>
    )
    };

const FilterOption = ({title,option,updateOptions}) => {
    const [open,setOpen] = useState(false);

    

    const DisplayOptions = () => {
        return (            
               <div className="option-buttons-container">
                    {option.map((item) => (
                        <OptButton key={item} name={item} title={title} updateOptions={updateOptions}/>
                    ))}
                </div>
            )
    }
  
    return (
        <div className="option-container">
            <button className="option-title" onClick={() => setOpen(!open)}>{open? <FaArrowDown />:<FaArrowRight />}{title}</button>
            <hr className='solid'></hr>
            {open? <DisplayOptions/>:<></>}
        </div>
    )
           
    }
    export default FilterOption;