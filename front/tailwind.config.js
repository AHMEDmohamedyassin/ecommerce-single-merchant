module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "maincolor" : "#e81c3f" ,
        "secondarybg" : "#fff" , 
        "mainbg" : "#f5f9f9" ,
        "secondarycolor" : "#34b36b"
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // Add the line-clamp plugin
  ],
}