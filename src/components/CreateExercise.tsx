import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from '@ionic/react';
import { get, set } from '../data/ionicStorage';

interface workout {
  name: string
}

const CreateExercise = () => {
  const [exercises, setExercises] = useState<Array<object>>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Number>();
  const [exerciseName, setExerciseName] = useState<string>("");
  const [exerciseSets, setExerciseSets] = useState<string>("");
  const [exerciseReps, setExerciseReps] = useState<string>("");
  const [workouts, setWorkouts] = useState<Array<workout>>([]);
  const id = Math.floor(10000 + Math.random() * 900000);

  const fetchWorkoutData = async () => {
    const workoutData = await get('workouts');
    const exerciseData = await get('exercises');
    console.log('fetching workouts..', workoutData);
    if (!workoutData.length) {
      set('workouts', []);
      setWorkouts([]);
    }
    else {
      setWorkouts(workoutData);
    }
    if (!exerciseData.length) {
      set('exercises', []);
    }
    else {
      setExercises(exerciseData);
    }
  }
  const storeExercise = async () => {
    console.log('storing exercise');
    await set('exercises', [...exercises, {
      id,
      name: exerciseName,
      sets: exerciseSets,
      reps: exerciseReps,
      workout: selectedWorkout,
    }]);
    setExerciseName("");
    setExerciseSets("");
    setExerciseReps("");
    // fetchWorkoutData();
  }

  useEffect(() => {
    fetchWorkoutData();
  }, [])

  return (
    <div>
      <IonList>
      <IonItem>
        <IonSelect interface="action-sheet" placeholder="Select Workout"
        onIonChange={(e) =>  setSelectedWorkout(e.detail.value)}
        >
          {workouts.map((workout: any) => {
            return (<div key={workout.id}>
              <IonSelectOption value={workout.id}>{workout.name}</IonSelectOption>
            </div>);
          })}
        </IonSelect>
      </IonItem>
    </IonList>
      <IonLabel>Exercise</IonLabel>
      <IonInput value={exerciseName} placeholder="Enter Exercise name" onIonChange={e => setExerciseName(e.detail.value!)} clearInput></IonInput>
      <IonInput value={exerciseSets} placeholder="Enter Sets" onIonChange={e => setExerciseSets(e.detail.value!)} clearInput></IonInput>
      <IonInput value={exerciseReps} placeholder="Enter Reps" onIonChange={e => setExerciseReps(e.detail.value!)} clearInput></IonInput>
      <IonButton onClick={storeExercise}>Save</IonButton>
      <div>
      {/* {workouts[0].name} */}
      </div>
    </div>
  );
};

CreateExercise.propTypes = {
  
};

export default CreateExercise;