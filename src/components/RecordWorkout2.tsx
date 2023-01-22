import React, { useEffect, useId, useState } from 'react';
// import PropTypes from 'prop-types';
import { get, set } from '../data/ionicStorage';
import { IonAccordion, IonAccordionGroup, IonButton, IonCol, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import range from 'lodash.range';

interface SessionProps {
  currentSession: object,
  setCurrentSession: React.Dispatch<React.SetStateAction<object>>
};

const RecordWorkout2: React.FC<SessionProps> = (props: SessionProps) => {
  console.log('props: ', props);
  const { currentSession, setCurrentSession } = props;
  const [workoutData, setWorkoutData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [workoutRecordData, setWorkoutRecordData] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [filteredExercises, setFilteredExercises] = useState([]);

  const fn = async () => {
    setWorkoutData(await get('workouts'));
    setExerciseData(await get('exercises'));
    setWorkoutRecordData(await get('workoutRecords'));
  };

  const filterExercise = (workoutId: string) => {
    const result = exerciseData.filter((exercise: any) => exercise.workout === workoutId);
    setFilteredExercises(result);
    return result;
  }

  const updateCurrentSession = (exerciseId: number, setId: number, weight: string | number | null = null, reps: string | number | null = null) => {
    console.log('update session: ', exerciseId, setId, weight, reps);
    const sessionCopy: any = { ...currentSession };
    console.log('sessionCopy: ', JSON.stringify(sessionCopy));
    if (reps) {
      sessionCopy[exerciseId][setId].reps = reps;
    }
    if (weight) {
      sessionCopy[exerciseId][setId].weight = weight;
    }
    console.log('sessionCopy update: ', sessionCopy);
    // setCurrentSession(sessionCopy);
  }

  const setInitialSetData = () => {
    const setsInitialData: any = {};
    filteredExercises.forEach((exercise: any) => {
      const sets = parseInt(exercise.sets);
      const exerciseSets = range(sets).map((set) => ({ set, reps: exercise.reps, weight: 0, exerciseId: exercise.id }));
      setsInitialData[exercise.id] = exerciseSets;
    });
    console.log('setinitialdata: ', setsInitialData);
    setCurrentSession(setsInitialData);
  }


  useEffect(() => {
    fn();
  }, []);
  console.log('all Data', workoutData, exerciseData, workoutRecordData);

  return (
    <div>
      <h1>Record Workout</h1>

      <IonSelect interface="action-sheet" placeholder="Select Workout"
        onIonChange={(e) => {
          setSelectedWorkout(e.detail.value);
          const filteredEx = filterExercise(e.detail.value);
          // if (e?.detail?.value && filteredEx.length) {
          //   createSession(e.detail.value, filteredEx);
          // }
        }}
      >
        {workoutData.map((workout: any) => {
          return (<div key={workout.id}>
            <IonSelectOption value={workout.id}>{workout.name}</IonSelectOption>
          </div>);
        })}
      </IonSelect>

      {
        filteredExercises.map((exercise: any) => (

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
                            onIonBlur={e => updateCurrentSession(exercise.id, index, e.target.value!, null)}
                            clearInput>
                          </IonInput>

                        </IonLabel>
                      </IonCol>
                      <IonCol col-4>
                        <IonLabel>
                          <IonInput
                            placeholder='Reps for the set'
                            min='0'
                            max='1000'
                            type='number'
                            inputmode='numeric'
                            onIonBlur={e => updateCurrentSession(exercise.id, index, null, e.target.value!)}
                            clearInput
                          >

                          </IonInput>
                          {/* {exercise.reps} */}
                        </IonLabel>
                      </IonCol>
                    </IonRow>
                  ))
                }
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        ))
      }

      {!!selectedWorkout &&
        <IonButton onClick={setInitialSetData}>
          Start
        </IonButton>
      }
    </div>
  );
};

RecordWorkout2.propTypes = {

};

export default RecordWorkout2;