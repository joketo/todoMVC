package com.example.todomvcbackend.testhelper;
import com.example.todomvcbackend.model.Task;


public class TestHelper {

    public static Task createTaskWithDescription(String description) {
        Task taskEntity = new Task();
        taskEntity.setId(1);
        taskEntity.setDescription(description);
        taskEntity.setCompleted(false);
        return taskEntity;
    }
}
