# react-native-custom-component-checkbox
Checkbox component for React native for both android and ios

## Installation:

Install the component through npm using:

```
npm install react-native-custom-component-checkbox --save
```
![1](https://user-images.githubusercontent.com/32927921/31880348-d659181e-b7fd-11e7-8e96-3e6cd16b4dc5.png)
![2](https://user-images.githubusercontent.com/32927921/31880350-db3fb248-b7fd-11e7-8c78-5cd36852cecd.png)

## Example:
```js
import CheckBox from 'react-native-custom-component-checkbox';

let data=[{typedValue:1,isTextInputField:false,isRequired:true,label:"first item",isImage:false,text:""},
          {typedValue:2,isTextInputField:true,isRequired:true,label:"",isImage:false,text:""},
          {typedValue:3,isTextInputField:false,isRequired:false,label:"",isImage:true,url:''},
          {typedValue:3,isTextInputField:false,isRequired:false,label:"None of the above",isImage:false,url:'',noneOfabove:'true'}];

<Checkbox
 dataSource={data}
 onItemChecked={(data,i)=>{
 }}
 itemShowKey="label"
 itemCheckedKey="RNchecked"
 labelHorizontal={true}
/>
```

## Props:


- `label` : text that will be displayed along the checkbox
- `dataSource` : describes parameters in an array for the custom components
- `onItemChecked` : function defined to get a call back when each component whether selected or not
- `itemShowKey` : describes the text to be displayed for each checkbox
- `itemCheckedKey`: check condition whether a checkbox selected or not
- `labelHorizontal` : align label horizontal with the checkbox
-  `textInputStyle` : user could define the styles for the text input
-  `imageStyle` : user could define styles for the image
-  `checkboxStyle` : user could define styles for checkbox
- `contentContainerStyle` : style object that will be applied to the container
