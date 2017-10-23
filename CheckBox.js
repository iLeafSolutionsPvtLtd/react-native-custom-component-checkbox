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
import styles from './styles'


var data;
var strings = "English"

class CheckboxForm extends Component {
  constructor(props) {
      super(props);
      this.renderCheckItem = this.renderCheckItem.bind(this);
      this._onPress = this._onPress.bind(this);
      this.isCheckedText = this.isCheckedText.bind(this);

      this.state = {
        dataSource: props.dataSource,
        values:[],
        value:"",
        updatedText:""
      };
  }

  static propTypes = {
      style: View.propTypes.style,
      labelStyle: View.propTypes.style,
      dataSource: PropTypes.array,
      labelHorizontal: PropTypes.bool,
      itemShowKey: PropTypes.string,
      itemCheckedKey: PropTypes.string,
      iconColor: PropTypes.string,
      onChecked: PropTypes.func,
  };

  static defaultProps = {
      dataSource: [],
      labelHorizontal: true,
      itemShowKey: 'label',
      itemCheckedKey: 'checked',
      iconColor: 'black',
  };

  componentDidMount() {
      const valueArray=this.props.dataSource.map((item, i) => item.label)
      this.setState({values:valueArray});
      strings = "hello"
  }

  componentWillReceiveProps(nextProps){
      const valueArray=nextProps.dataSource.map((item, i) => item.label)
      this.setState({values:valueArray});
  }

  _onPress(item, i) {
      const {itemCheckedKey} = this.props;
      let outputArr = [];
      if(item[itemCheckedKey]){
        if(item.noneOfabove){
          outputArr=this.state.dataSource.map((item,key)=>
            {return {...item,[itemCheckedKey]:false}}
          )
        }
        else
        {
          outputArr=this.state.dataSource.map((item,key)=>
            {if(item.noneOfabove) return {...item,[itemCheckedKey]:false}
              else
              return item
            }
          )
        }
      }
      else
      {
        outputArr=this.state.dataSource;
      }
      outputArr.splice(i,1,item);
      this.setState({ dataSource: outputArr });
      this.props.onItemChecked(outputArr,i);
  }


  isCheckedText(checked,item,i){
    if(checked==true && item.isTextInputField==true){
      item.text = this.state.values[i]
    }
    this._onPress(item,i);
  }


  renderCheckItem(item, i) {
    const { itemShowKey, itemCheckedKey, iconColor } = this.props;
    const isChecked = item[itemCheckedKey] || false;

    return (
          <View style={this.props.contentContainerStyle || styles.container}>
                <TouchableWithoutFeedback
                  style={{marginBottom:30}}
                  key={i}
                  onPress={() => {
                    item[itemCheckedKey] = !isChecked;
                    this._onPress(item, i);
                    }}
                >
                    <View
                      style={{flexDirection: this.props.labelHorizontal ? 'row' : 'column',alignItems:'center'}}>
                      {isChecked?
                        this.renderCheckedBox(images.check_tick):
                        this.renderCheckedBox(images.check)
                      }
                          <View style={{marginLeft:10}}>
                            <Text style={styles.textItem}>{item[itemShowKey]}</Text>
                          </View>
                    </View>
                </TouchableWithoutFeedback>
                {item.isTextInputField?
                  this.renderTextInput(isChecked,item,i):
                  null
                }
                {item.isImage?
                  this.renderImage(item):
                  null
                }
          </View>
        );
     }

  renderTextInput(isChecked,item,i){
    return(
        <View style={styles.inputText}>
          <TextInput
            editable={isChecked}
            underlineColorAndroid='transparent'
            multiline={true}
            placeholder={item.isRequired?'*'+strings.required_text:''}
            onChangeText={(text)=>{
              let values=this.state.values;
              values[i]=text
              this.setState({values})
              this.isCheckedText(item.RNchecked,item,i);
            }}
           value={this.state.values[i]}
           style={this.props.textInputStyle || {textAlignVertical: 'top',marginBottom:5,backgroundColor:!isChecked?'grey':'white',},styles.changeText}/>
        </View>
       );
    }

  renderCheckedBox(image){
    return(
        <View style={styles.checkedBox}>
          <Image source={image}
             style={this.props.checkboxStyle || {height:18, width:18,resizeMode:'contain'}}/>
        </View>
    );
   }

  renderImage(item){
     return(
         <View style={styles.isImage}>
           <Image source={images.ileaflogo} style={this.props.imageStyle||styles.reactlogo}/>
         </View>
     );
   }

  renderBox(){
      return(
        <View style={styles.checkedBox}>
          <Image source={images.unchecked}
            style={this.props.checkboxStyle || {height:14, width:14}}></Image>
        </View>
      );
  }

  render() {
      let onItemChecked = this.props.onItemChecked
      return (
        <ScrollView
          {...this.props}
          contentContainerStyle={this.props.contentContainerStyle || {flex:1,flexDirection: 'row' },styles.components}>
          {this.state.dataSource.map((item, i) => this.renderCheckItem(item, i))}
        </ScrollView>
        );
      }

   }

export default CheckboxForm;
