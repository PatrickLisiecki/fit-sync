"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("ai_workouts", [
      {
        userId: 1,
        workout: `
        **Workout Routine: Full-Body Blast**
        
        
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        workout: `
        **Workout Routine: Full-Body Blast**
        
        **Warm-up:**
        - Jumping Jacks: 2 minutes
        - Arm Circles: 1 minute
        - Leg Swings: 1 minute
        - High Knees: 2 minutes
        
        
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        workout: `
        **Workout Routine: Full-Body Blast**
        
        **Warm-up:**
        - Jumping Jacks: 2 minutes
        - Arm Circles: 1 minute
        - Leg Swings: 1 minute
        - High Knees: 2 minutes
        
        **Circuit: Repeat 3 Times**
        1. Push-Ups: 12 reps
        2. Bodyweight Squats: 15 reps
        3. Bent-Over Rows (using water bottles or light weights): 12 reps each arm
        4. Lunges: 10 reps each leg
        5. Plank: Hold for 30 seconds
        6. Bicycle Crunches: 20 reps each side
        
        **Rest:** 1-2 minutes between circuits
        
        **Cool Down:**
        - Seated Forward Fold: Hold for 1 minute
        - Child's Pose: Hold for 1 minute
        - Shoulder and Triceps Stretch: 30 seconds each arm
        - Quad Stretch: 30 seconds each leg
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        workout: `
        **Workout Routine: Full-Body Blast**
        
        **Warm-up:**
        - Jumping Jacks: 2 minutes
        - Arm Circles: 1 minute
        - Leg Swings: 1 minute
        - High Knees: 2 minutes
        
        **Circuit: Repeat 3 Times**
        1. Push-Ups: 12 reps
        2. Bodyweight Squats: 15 reps
        3. Bent-Over Rows (using water bottles or light weights): 12 reps each arm
        4. Lunges: 10 reps each leg
        5. Plank: Hold for 30 seconds
        6. Bicycle Crunches: 20 reps each side
        
        **Rest:** 1-2 minutes between circuits
        
        **Cool Down:**
        - Seated Forward Fold: Hold for 1 minute
        - Child's Pose: Hold for 1 minute
        - Shoulder and Triceps Stretch: 30 seconds each arm
        - Quad Stretch: 30 seconds each leg
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        workout: `
        **Workout Routine: Full-Body Blast**
        
        **Warm-up:**
        - Jumping Jacks: 2 minutes
        - Arm Circles: 1 minute
        - Leg Swings: 1 minute
        - High Knees: 2 minutes
        
        **Circuit: Repeat 3 Times**
        1. Push-Ups: 12 reps
        2. Bodyweight Squats: 15 reps
        3. Bent-Over Rows (using water bottles or light weights): 12 reps each arm
        4. Lunges: 10 reps each leg
        5. Plank: Hold for 30 seconds
        6. Bicycle Crunches: 20 reps each side
        
        **Rest:** 1-2 minutes between circuits
        
        **Cool Down:**
        - Seated Forward Fold: Hold for 1 minute
        - Child's Pose: Hold for 1 minute
        - Shoulder and Triceps Stretch: 30 seconds each arm
        - Quad Stretch: 30 seconds each leg
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more data entries as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("ai_workouts", null, {});
  },
};
