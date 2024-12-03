const initial = {
    page_loading : false,
    side_menu : false ,
    redirect : null 
}

export const SettingReducer = (state = initial , action) => {
    switch (action.type){
        case "Setting_Data":
            return {
                ...state,
                ...action.data
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