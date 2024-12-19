module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "maincolor" : "#ffc933" ,
        "secondarybg" : "#fff" , 
        "mainbg" : "#f5f9f9" ,
        "secondarycolor" : "#449f93"
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // Add the line-clamp plugin
  ],
}

// colors:{
//   "maincolor" : "#ffc933" ,
//   "secondarybg" : "#fff" , 
//   "mainbg" : "#f5f9f9" ,
//   "secondarycolor" : "#449f93"
// }