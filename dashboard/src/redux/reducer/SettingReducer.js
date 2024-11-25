const initial = {
    status : "n" ,
    page_loading : false,
    side_menu : false , 
    items : [] , 
    statistics : []
}

export const SettingReducer = (state = initial , action) => {
    switch (action.type){
        case "Setting_Data":
            return {
                ...state,
                status : 'n',
                ...action.data
            }
        case "Setting_Status":
            return {
                ...state,
                status : action.data
            }
        case "Setting_Loading":
            return {
                ...state,
                page_loading : action.data
            }
        case "Setting_Reset" : 
            return initial
        default: 
            return state;
    }
}