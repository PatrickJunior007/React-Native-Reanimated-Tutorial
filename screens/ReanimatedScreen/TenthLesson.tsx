import {View} from 'react-native';
import React, {useState} from 'react';
import ListItem from '../../Components/ListItem';
import {FlatList} from 'react-native-gesture-handler';

export type Mmodel = {
  id: number;
  title: string;
};

const Mens: Mmodel[] = [
  {
    id: 1,
    title: 'test',
  },
  {
    id: 2,
    title: '3rgerg ',
  },
  {
    id: 3,
    title: 'tergregst',
  },
  {
    id: 4,
    title: 'tegrgest',
  },
  {
    id: 5,
    title: 'tegrgest',
  },
  {
    id: 6,
    title: 'tegrgest',
  },
  {
    id: 7,
    title: 'tegrgest',
  },
  {
    id: Math.random(),
    title: 'tegrgest',
  },
  {
    id: Math.random(),
    title: 'tegrgest',
  },
  {
    id: Math.random(),
    title: 'tegrgest',
  },
  {
    id: Math.random(),
    title: 'tegrgest',
  },
  {
    id: Math.random(),
    title: 'tegrgest',
  },
  {
    id: Math.random(),
    title: 'tegrgest',
  },
];

const TenthLesson = () => {
  const [tasks, setTasks] = useState(Mens);

  const handleDismiss = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <View>
      <FlatList
        data={tasks}
        keyExtractor={(item, _index) => item.id as unknown as string}
        renderItem={({item, index}) => {
          return (
            <ListItem
              handleDismiss={handleDismiss}
              key={item.id}
              data={item}
              _index={index}
            />
          );
        }}
      />
    </View>
  );
};

export default TenthLesson;
