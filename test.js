const User = sequelize.define('User', 
{
    firstName: {
        type: Sequelize.TEXT,
        field: 'first_name'
    },
    lastName: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'last_name'
    },
    userName: {
        type: Sequelize.TEXT,
        field: 'user_name',
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    tableName: 'users',
    underscored: true,
    classMethods: {
        associate: function(models) {
            User.hasMany(
      models.Trip,
                {
                    as: 'trips',
                    foreignKey: {
                        name: 'userId',
                        field: 'user_id',
                        allowNull: false
                    },
                    onDelete: 'CASCADE'
                });
        },
    },
    instanceMethods: {
        generateHash: function(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        },
        validatePassword: function(password) {
            return bcrypt.compareSync(password, this.password);
        },
        apiRepr: function() {
            return {
                id: this.id,
                firstName: this.firstName,
                lastName: this.lastName,
                userName: this.userName
            };
        }
    }
});