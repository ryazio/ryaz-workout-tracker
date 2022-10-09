import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { IonAccordion, IonAccordionGroup, IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonList, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import { get, set } from '../data/ionicStorage';

interface workout {
  name: string
}

// {
//   workout: "",
//   creationDate: "",
//   exercise: [{
//     id: '',
//     set1: { weight: 10, reps: 12 },
//     set2: { weight: 15, reps: 12 },
//     set3: { weight: 20, reps: 12 },
//   }
//   ]
// }

interface workoutRecordExercise {
  id: string,
  setId: number,
  weight: string,
  reps: string
}

interface workoutRecord {
  workoutId: string,
  creationDate: Date,
  exercise: Array<workoutRecordExercise> | []
}

const RecordWorkout = () => {
  const [exercises, setExercises] = useState<Array<object>>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<string>("");
  const [exerciseName, setExerciseName] = useState<string>("");
  const [exerciseSets, setExerciseSets] = useState<string>("");
  const [exerciseReps, setExerciseReps] = useState<string>("");
  const [workouts, setWorkouts] = useState<Array<workout>>([]);
  const [allWorkoutRecord, setAllWorkoutRecord] = useState<Array<workoutRecord>>();
  const [workoutRecord, setWorkoutRecord] = useState<workoutRecord>();

  const filteredExercises = exercises.filter((exercise: any) => exercise.workout === selectedWorkout);

  const fetchWorkoutData = async () => {
    const workoutData = await get('workouts');
    const exerciseData = await get('exercises');
    const workoutRecordData = await get('workoutRecords');
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
    if (!workoutRecordData.length) {
      set('workoutRecords', []);
    }
  }
  const storeExercise = async () => {
    console.log('storing exercise');
    await set('exercises', [...exercises, {
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
  }, []);

  const saveSetWeight = (exerciseId: string, setId: any, setWeight: any, reps: string) => {
    console.log('Save weight: ', exerciseId, setId, setWeight, reps);
    setWorkoutRecord((workoutRecord) => {
      const { exercise = [] } = workoutRecord || {};
      const alreadyExists = exercise.some((ex) => ex.id === exerciseId && ex.setId === setId);
      let exerciseData = [];
      if (!alreadyExists) {
        exerciseData = [...exercise, {
          id: exerciseId,
          setId,
          weight: setWeight,
          reps,
        }];
      } else {
        exerciseData = exercise.map((ex) => {
          if (ex.id === exerciseId && ex.setId === setId) {
            return {
              ...ex,
              weight: setWeight,
              reps: reps
            }
          }
          return ex;
        })
      }

      const workoutRecordData = {
        workoutId: selectedWorkout,
        creationDate: new Date(),
        exercise: exerciseData
      };

      // setAllWorkoutRecord([...allWorkoutRecord || [], workoutRecordData]);
      return workoutRecordData;
    })
  }

  const recordWorkout = async () => {
    await set('workoutRecords', [...allWorkoutRecord || [],
      workoutRecord
    ]);
  }

  return (
    <div>
      <IonList>
        <IonItem>
          <IonSelect interface="action-sheet" placeholder="Select Workout"
            onIonChange={(e) => setSelectedWorkout(e.detail.value)}
          >
            {workouts.map((workout: any) => {
              return (<div key={workout.id}>
                <IonSelectOption value={workout.id}>{workout.name}</IonSelectOption>
              </div>);
            })}
          </IonSelect>
          {/* <IonSelect interface="action-sheet" placeholder="Select Exercise"
          onIonChange={(e) =>  setSelectedWorkout(e.detail.value)}
          >
            {filteredExercises.map((exercise: any) => {
              return (<div key={exercise.id}>
                <IonSelectOption value={exercise.id}>{exercise.name}</IonSelectOption>
              </div>);
            })}
          </IonSelect> */}
        </IonItem>
      </IonList>
      <IonGrid>
        <IonRow>
          <IonCol col-4>
            <IonLabel >Name</IonLabel>
          </IonCol>
          <IonCol col-4>
            <IonLabel >Weight</IonLabel>
          </IonCol>
          <IonCol col-4>
            <IonLabel >Reps</IonLabel>
          </IonCol>
        </IonRow>
        {
          filteredExercises.map((exercise: any) => {
            console.log('filtered exercise: ', filteredExercises);
            return (
              <IonAccordionGroup>
                <IonAccordion value="first">
                  <IonItem slot="header" color="light">
                    <IonLabel>{exercise.name}</IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    {/* First Content */}
                    {
                      [...Array(Number(exercise.sets))].map((_, index) => (
                        <IonRow>
                          <IonCol col-4>
                            <IonLabel>Set {index + 1}</IonLabel>
                          </IonCol>
                          <IonCol col-4>
                            <IonLabel>
                              <IonInput
                                // value={exerciseName}
                                placeholder="Weight for the set"
                                min="1"
                                max="1000"
                                type="number"
                                inputmode="numeric"
                                onIonBlur={e => saveSetWeight(exercise.id, index, e.target.value!, exercise.reps)}
                                clearInput>
                              </IonInput>

                            </IonLabel>
                          </IonCol>
                          <IonCol col-4>
                            <IonLabel>{exercise.reps}</IonLabel>
                          </IonCol>
                        </IonRow>
                      ))
                    }
                  </div>
                </IonAccordion>
              </IonAccordionGroup>

            )
          })
        }
      </IonGrid>
      <IonButton onClick={recordWorkout}>Finish</IonButton>
    </div>
  );
};

RecordWorkout.propTypes = {

};

export default RecordWorkout;