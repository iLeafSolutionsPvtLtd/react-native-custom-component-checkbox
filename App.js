/**
 * react-native-checkbox-form
 * Checkbox component for react native, it works on iOS and Android
 * https://github.com/cuiyueshuai/react-native-checkbox-form.git
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import images from './images'




var strings = "English"
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

class CheckboxForm extends Component {
  constructor(props) {
    super(props);
    this.renderCheckItem = this.renderCheckItem.bind(this);
    this._onPress = this._onPress.bind(this);

    this.state = {
      dataSource: props.dataSource,
      values:[]
    };
  }

  static propTypes = {
    style: View.propTypes.style,
    labelStyle: View.propTypes.style,
    dataSource: PropTypes.array,
    formHorizontal: PropTypes.bool,
    labelHorizontal: PropTypes.bool,
    itemShowKey: PropTypes.string,
    itemCheckedKey: PropTypes.string,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
    onChecked: PropTypes.func,
  };

  static defaultProps = {
    dataSource: [],
    formHorizontal: false,
    labelHorizontal: true,
    itemShowKey: 'label',
    itemCheckedKey: 'checked',
    iconSize: 50,
    iconColor: 'black',
  };

  componentDidMount() {

    const valueArray=this.props.dataSource.map((item, i) => item.label)
    console.log("Value Array: ",valueArray);
    this.setState({values:valueArray});
    strings = "hello"
  }

  componentWillReceiveProps(nextProps){
    const valueArray=nextProps.dataSource.map((item, i) => item.label)
    console.log("Value Array: ",valueArray);
    this.setState({values:valueArray});
  }

  _onPress(item, i) {
    const outputArr = this.props.dataSource.slice(0);
    outputArr[i] = item;
    this.setState({ dataSource: outputArr });
    if (this.props.onChecked) {
      this.props.onChecked(outputArr,this.state.values[i],i);
    }
  }


  renderCheckItem(item, i) {
    const { itemShowKey, itemCheckedKey, iconSize, iconColor } = this.props;
   const isChecked = item[itemCheckedKey] || false;
   console.log("RENDERED...", item[itemShowKey],"::::",isChecked,"..",this.state.values);

    return (
      <View style={{flex:1,flexDirection:"column",backgroundColor:"pink",height:200,width:WINDOW_WIDTH,marginTop:5}}>
        <TouchableWithoutFeedback
          key={i}
          onPress={() => {
            item[itemCheckedKey] = !isChecked;
            this._onPress(item, i);
          }}
        >
          <View
            style={{  flexDirection: this.props.labelHorizontal ? 'row' : 'column',
            alignItems:'center',justifyContent: 'center'}}
          >
            {isChecked?
              this.renderCheckedBox():
              this.renderBox()
            }

            <View>
              <Text style={{fontSize:20}}> {item[itemShowKey]}</Text>

            </View>
          </View>
        </TouchableWithoutFeedback>
          {item.isTextInputField?
            <View style={{paddingBottom:8}}>
              <TextInput
                value={this.state.values[i]}
                placeholder={item.isRequired?'*'+strings.required_text:''}
                onChangeText={(text)=>{

                  let valueTemp=this.state.values;
                  valueTemp[i]=text;
                  this.setState({values:valueTemp})
                  this.props.onChangeText(item,text,i)}}
                style={{alignSelf:'flex-start',fontSize:16,textAlignVertical: 'top',backgroundColor:!isChecked?'grey':'white',borderWidth:1,borderColor:'black',width:WINDOW_WIDTH-100,height:WINDOW_HEIGHT/10}}/>
            </View>:
            null
          }

      </View>

    );
  }

  renderCheckedBox(){
    return(
      <View style={{height:14,width:14,borderColor:'black',borderWidth:1}}>
      <Image source={images.checkbox}
         style={{height:14, width:14}}></Image>
      </View>
    );
  }

  renderBox(){
    return(
      <View style={{height:14,width:14,borderColor:'black',borderWidth:1}}/>
    );
  }

  render() {
    console.log("data source:::",this.props.dataSource);
    return (
      <ScrollView
        {...this.props}
        contentContainerStyle={{flex:1,
          alignItems: 'flex-start',
          flexDirection: this.props.formHorizontal ? 'row' : 'column',
          flexWrap: 'wrap',
          width:WINDOW_WIDTH-60,
        }}

      >
        {

           this.props.dataSource.map((item, i) => this.renderCheckItem(item, i))

        }
      </ScrollView>
    );
  }

}

export default CheckboxForm;
