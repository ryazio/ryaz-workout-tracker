import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { IonButton, IonInput } from '@ionic/react';
import { get, set } from '../data/ionicStorage';

interface workout {
  name: string,
  id: number
}

const CreateWorkout = () => {
  const [text, setText] = useState<string>("");
  const [workouts, setWorkouts] = useState<Array<workout>>([]);
  const id = Math.floor(10000 + Math.random() * 900000);
  const fetchWorkoutData = async () => {
    const workoutData = await get('workouts');
    console.log('fetching workouts..', workoutData);
    if (!workoutData) {
      set('workouts', []);
      setWorkouts([]);
    }
    else {
      setWorkouts(workoutData);
    }
  }
  const storeWorkout = async () => {
    console.log('storing workout');
    await set('workouts', [...workouts, { id, name: text }]);
    setText('');
    fetchWorkoutData();
  }

  useEffect(() => {
    fetchWorkoutData();
  }, [])

  return (
    <div>
      <IonInput value={text} placeholder="Enter Workout Name" onIonChange={e => setText(e.detail.value!)} clearInput></IonInput>
      <IonButton onClick={storeWorkout}>Save</IonButton>
      <div>
        {/* {workouts.map((workout: any) => {
        <div key={workout.name}>
          {workout.name}
        </div>
      })} */}
        {/* {workouts[0].name} */}
        {
          workouts.map((workout) => (
            <div key={workout.id}>
              {workout.name}
            </div>
          )
          )
        }
      </div>
    </div>
  );
};

CreateWorkout.propTypes = {

};

export default CreateWorkout;