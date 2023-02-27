'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     let user = await queryInterface.bulkInsert('Users', [{
      firstName: 'Memer',
      lastName: 'Memer',
      email: 'memer@myclassroom.com',
      password: 'memer69!',
      admin: false
    }], {});

    let course = await queryInterface.bulkInsert('Courses', [{
      name: "Memers 101",
      description: "Master the Art of the Memer: Just ask Mitchell Stewart"
    }], {});

    let section = await queryInterface.bulkInsert('Sections', [{
      courseId: course,
      number: 0,
      joinCode: 'xxxxxx'
    }], {} )

    let teacher = await queryInterface.bulkInsert('Enrollments', [{
      courseId: course,
      role: "teacher",
      userId: user
    }])

    let student = await queryInterface.bulkInsert('Enrollments', [{
      sectionId: section,
      role: "student",
      userId: user
    }])
 },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
