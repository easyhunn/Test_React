const initialState = {
    todo: [],
  };
  
  /*
  Payload shape:
  
  payload: {
   
  }
  */
  export default function todo(state = initialState, action) {
    switch (action.type) {
      case 'ADD_TODO': {
        return {
            todo: action.payload
        };
      }
      
      default:
        return state;
    }
  }
  