package com.example.todomvcbackend.model;

/**
 * Class for creating a new Task
 */
public class TaskInput {

    private String description;
    private boolean completed;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    @Override
    public String toString() {
        return "TaskInput{" +
                "description='" + description + '\'' +
                ", completed=" + completed +
                '}';
    }
}