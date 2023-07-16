import React from 'react'
import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css';
import "./InputTagsCustom.scss";

class InputTagsCustom extends React.Component {
  constructor() {
    super()
    this.state = {tags: []}
  }

  handleChange = (tags) => {
    this.setState({tags})
  }
  pasteSplit = (data) => {
    return data.split(';').map(d => d.trim())
  }
  render() {
    return <TagsInput value={this.state.tags} onChange={this.handleChange} 
    addOnPaste={true}
    addOnBlur={true}
    pasteSplit={this.pasteSplit}/>
  }
}

export default InputTagsCustom;