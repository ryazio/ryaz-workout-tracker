import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import { get, set } from '../data/ionicStorage';
import { trash } from 'ionicons/icons';

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

  const deleteWorkout = async(workoutId: number) => {
    const updatedWorkoutsList = workouts.filter((workout: workout) => workout.id !== workoutId);
    setWorkouts(updatedWorkoutsList);
    await set('workouts', updatedWorkoutsList);
    // TODO: Delete related exercises and workout history
  }

  useEffect(() => {
    fetchWorkoutData();
  }, [])

  return (
    <IonContent className="ion-padding">
      <IonInput
        value={text}
        placeholder="Enter Workout Name like Chest, Legs"
        onIonChange={e => setText(e.detail.value!)}
        clearInput>
      </IonInput>
      <IonButton onClick={storeWorkout}>Save</IonButton>
      <IonList>
      <IonListHeader>
        <IonLabel>Existing Workouts</IonLabel>
      </IonListHeader>
        {
          workouts.map((workout: workout) => (
            <IonItem key={workout.id}>
              <IonLabel>{workout.name}</IonLabel>
              <IonButton slot="end" onClick={() => deleteWorkout(workout.id)}>
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonButton>
            </IonItem>
          )
          )
        }
      </IonList>
    </IonContent>
  );
};

CreateWorkout.propTypes = {

};

export default CreateWorkout;