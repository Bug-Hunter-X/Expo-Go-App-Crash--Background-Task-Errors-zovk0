//Improved background task handling
import * as TaskManager from 'expo-task-manager';
import { Platform } from 'react-native';

const TASK_KEY = 'myBackgroundTask';

export const startBackgroundTask = async () => {
  //Check if the task already exists before registering it
  if (!TaskManager.isTaskRegistered(TASK_KEY)) {
    TaskManager.registerTaskAsync(TASK_KEY, async () => {
      // Add error handling to gracefully manage any task failures
      try {
        // Perform background task operations here...
        console.log('Background task running');
      } catch (error) {
        console.error('Background task error:', error);
        // Add appropriate recovery mechanisms here such as retrying task.
      } finally {
        // Ensure the task is properly terminated when finished or encountering errors
      }
    });
  }

  //Ensure only one task runs at a time by first unregistering before registering
  if(await TaskManager.isTaskRegistered(TASK_KEY)){
    await TaskManager.unregisterTaskAsync(TASK_KEY)
  }

  await TaskManager.registerTaskAsync(TASK_KEY, async () => {
    try{
      //Perform background operations
    } catch(error){
      console.error('Background task failed to start:', error);
    }
  })

  await TaskManager.startTaskAsync(TASK_KEY);
};

export const stopBackgroundTask = async () => {
  try {
    await TaskManager.unregisterTaskAsync(TASK_KEY);
    console.log('Background task stopped successfully');
  } catch (error) {
    console.error('Failed to stop the background task:', error);
  }
};

//Example of using the functions
startBackgroundTask();
//Stop the background task after some time using setTimeout
setTimeout(()=>stopBackgroundTask(), 10000)