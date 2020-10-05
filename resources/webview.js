import React, {useReducer} from 'react';
import ReactDOM from 'react-dom';
import { TextInput, View, Radio, Button } from 'react-desktop/macOs';

const categories = [
  {text: '全部', value: 'any'},
  {text: '动物', value: 'animals'},
  {text: '建筑', value: 'arch'},
  {text: '自然', value: 'nature'},
  {text: '人物', value: 'people'},
  {text: '科技', value: 'tech'}
];
const filters = [
  {text: '正常', value: 'none'},
  {text: '黑白照', value: 'grayscale'},
  {text: '老照片', value: 'sepia'}
];

function App() {
  const [{width, height, category, filter}, dispatch] = useReducer(function(state, {type, ...payload}) {
    switch(type) {
      default:
        return {...state, ...payload};
    }
  }, {
    width: undefined,
    height: undefined,
    category: 'any',
    filter: 'none'
  });

  const onInsert = () => {
    if(isNaN(parseInt(width)) || isNaN(parseInt(height))) {
      return;
    }

    global.postMessage('insert', width, height, category, filter);
  }

  return (<>
  <div style={{display: 'flex', alignItems: 'flex-end'}}>
    <TextInput
      label="请输入图片尺寸："
      placeholder="宽"
      defaultValue={width}
      onChange={e => dispatch({width: e.target.value})}
    />
    <div style={{padding: '0 10px 5px 10px'}}>×</div>
    <TextInput
      placeholder="高"
      defaultValue={height}
      onChange={e => dispatch({height: e.target.value})}
    />
  </div>
  <View layout="vertical" marginTop={10}>
    <div style={{marginBottom: 3}}>请选择图片分类：</div>
    <View horizontalAlignment="left" layout="horizontal">
      {categories.map(({text, value}) => (
        <View marginRight={5} key={value}>
          <Radio
            name="category"
            label={text}
            defaultValue={value}
            defaultChecked={category === value}
            onChange={e => dispatch({category: e.target.value})}
          />
        </View>
      ))}
    </View>
  </View>
  <View layout="vertical" marginTop={10}>
    <div style={{marginBottom: 3}}>请选择图片分类：</div>
    <View horizontalAlignment="left" layout="horizontal">
      {filters.map(({text, value}) => (
        <View marginRight={5} key={value}>
          <Radio 
            name="filter" 
            label={text} 
            defaultValue={value}
            defaultChecked={filter === value} 
            onChange={e => dispatch({filter: e.target.value})} 
          />
        </View>
      ))}
    </View>
  </View>
  <View layout="vertical" marginTop={20}>
    <Button color="blue" onClick={onInsert}>插入</Button>
  </View>
  </>)
}

ReactDOM.render(<App />, document.getElementById('app'));