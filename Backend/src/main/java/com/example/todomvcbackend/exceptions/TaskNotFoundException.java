package com.example.todomvcbackend.exceptions;

public class TaskNotFoundException extends Exception {

    public TaskNotFoundException(String message, int id) {
        super(message);
    }
}
