DROP TABLE IF EXISTS TASK;
CREATE TABLE TASK (
        id IDENTITY NOT NULL PRIMARY KEY,
        description VARCHAR(500) NOT NULL,
        completed BIT NOT NULL
);

-- Data for demo
INSERT INTO TASK (description, completed) VALUES
        ('Feed the cats', false),
        ('Water the plants', false),
        ('Grind the coffee beans', false);