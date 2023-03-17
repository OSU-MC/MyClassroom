'use strict';

const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 8

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /*
      CREATE USERS
    */

     let teacherOnlyUser = await queryInterface.bulkInsert('Users', [{
      firstName: 'Teacher',
      lastName: 'User',
      email: 'teacheruser@myclassroom.com',
      password: await bcrypt.hash('teacherteacher', saltRounds),
      admin: false
    }], {});

    let studentOnlyUser = await queryInterface.bulkInsert('Users', [{
      firstName: 'Student',
      lastName: 'User',
      email: 'studentuser@myclassroom.com',
      password: await bcrypt.hash('studentstudent', saltRounds),
      admin: false
    }], {});

    let studentUserNoCourses = await queryInterface.bulkInsert('Users', [{
      firstName: 'No',
      lastName: 'Courses',
      email: 'nocourses@myclassroom.com',
      password: await bcrypt.hash('nocourses', saltRounds),
      admin: false
    }], {});

    let comboUser = await queryInterface.bulkInsert('Users', [{
      firstName: 'Combo',
      lastName: 'User',
      email: 'combouser@myclassroom.com',
      password: await bcrypt.hash('combocombocombo', saltRounds),
      admin: false
    }], {});

    
    /*
      CREATE COURSE 1 DATA: for comprehensive testing
    */

    let course1 = await queryInterface.bulkInsert('Courses', [{
      name: "Main Course",
      description: "This course is for primary testing"
    }], {});

    let teachercourse1 = await queryInterface.bulkInsert('Enrollments', [{
      userId: teacherOnlyUser,
      courseId: course1,
      role: 'teacher'
    }], {})

    let section1course1 = await queryInterface.bulkInsert('Sections', [{
      courseId: course1,
      number: 0,
      joinCode: '123456'
    }], {} )

    let section2course1 = await queryInterface.bulkInsert('Sections', [{
      courseId: course1,
      number: 1,
      joinCode: '654321'
    }], {} )

    let studentenrollmentsection1course1 = await queryInterface.bulkInsert('Enrollments', [{
      userId: studentOnlyUser,
      sectionId: section1course1,
      role: 'student'
    }], {})

    let comboenrollmentsection1course2 = await queryInterface.bulkInsert('Enrollments', [{
      userId: comboUser,
      sectionId: section1course1,
      role: 'student'
    }], {})

    /*
      CREATE COURSE 2 DATA: only for testing multiple courses for a teacher and multiple courses for a student
    */

    let course2 = await queryInterface.bulkInsert('Courses', [{
      name: "Multiple Course Testing",
      description: "This course is for testing multiple enrollments for one user"
    }], {});

    let teachercourse2 = await queryInterface.bulkInsert('Enrollments', [{
      userId: teacherOnlyUser,
      courseId: course2,
      role: 'teacher'
    }], {})

    let section1course2 = await queryInterface.bulkInsert('Sections', [{
      courseId: course2,
      number: 0,
      joinCode: '567890'
    }], {} )

    let studentenrollmentsection1course2 = await queryInterface.bulkInsert('Enrollments', [{
      userId: studentOnlyUser,
      sectionId: section1course2,
      role: 'student'
    }], {})

    /*
      CREATE COURSE 3 DATA: only for testing enrollment as teacher and student
    */

    let course3 = await queryInterface.bulkInsert('Courses', [{
      name: "Test Combo User",
      description: "Test that a user can be a teacher and student"
    }], {});

    let teachercourse3 = await queryInterface.bulkInsert('Enrollments', [{
      userId: comboUser,
      courseId: course3,
      role: 'teacher'
    }], {})

 },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      email: 'teacheruser@myclassroom.com'
    }, {});
    await queryInterface.bulkDelete('Users', {
      email: 'studentuser@myclassroom.com'
    }, {});
    await queryInterface.bulkDelete('Users', {
      email: 'combouser@myclassroom.com'
    }, {});
    await queryInterface.bulkDelete('Courses', {
      name: "Test Combo User"
    }, {})
    await queryInterface.bulkDelete('Courses', {
      name: "Main Course"
    }, {})
    await queryInterface.bulkDelete('Courses', {
      name: "Multiple Course Testing"
    }, {})
  }
};
