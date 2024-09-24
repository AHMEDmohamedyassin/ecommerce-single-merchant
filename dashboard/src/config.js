
const mainColor  = "#fff"

export const selectStyle = {
    option: (baseStyles, state) => ({
      ...baseStyles,
      // backgroundColor: state.isFocused ? mainColor : '',
      // color: state.isFocused ? 'white' : '#222'
    }),
    singleValue:(baseStyles , state) => ({
      ...baseStyles ,
      // color: mainColor ,
      // fontWeight : 700
    }),
    container:(baseStyles , state) => ({
      ...baseStyles ,
      width : "100%",
      // border: `1px solid ${mainColor}` ,
      borderColor : "#999",
      borderRadius : "15px" , 
      fontSize: "12px"
    }),
    control: (styles) => ({ 
      border:"0.5px #e5e7eb solid",
      display : "flex",
      borderRadius:'2px' ,
      backgroundColor : "#f5f9f9",
      padding : "2px 3.5px",
      minHeight:"45px"
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#222",
      backgroundColor:"white",
      fontSize:"16px",
      fontWeight : "500",
      marginLeft : "10px"
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor:"white",
      borderRadius: '4px',
      border:`solid 1px #999`,
      color: "#333",
      padding: '2px 6px',
      marginLeft:"10px",
    })
  }
  