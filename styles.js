import { StyleSheet,Dimensions } from 'react-native';
import PropTypes from 'prop-types';
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
export default StyleSheet.create({

  container:{
    margin:15,
    width:WINDOW_WIDTH,
    },
  checkbox:{
     justifyContent: 'flex-start'
   },
  textItem: {
    fontSize:17,
    color:"black"
  },
  inputText:{
    marginTop:2,
    paddingLeft:28,

  },
  changeText:{
    alignSelf:'flex-start',
    fontSize:16,
    textAlignVertical: 'top',
    borderWidth:1,
    borderColor:'black',
    width:WINDOW_WIDTH-120,
    height:100
  },
  isImage:{
    height:100,
    paddingLeft:25
  },
  reactlogo:{
    height:100,
    width:240,

  },
  checkedBox:{
    height:18,
    width:14,


  },
  renderBox:{
    height:14,
    width:14,
    borderColor:'black',
    borderWidth:1
  },
  components:{

    alignItems: 'flex-start',
    width:WINDOW_WIDTH-60,
    paddingBottom:WINDOW_HEIGHT/13
  }

 })
