package com.example.todomvcbackend.controller;

import java.util.List;

import com.example.todomvcbackend.exceptions.TaskNotFoundException;
import com.example.todomvcbackend.model.Task;
import com.example.todomvcbackend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {
    @Autowired
    TaskService taskService;

    @GetMapping("/task")
    private List<Task> getAllTasks() {
        return taskService.getAll();
    }

    @GetMapping("/task/{id}")
    private Task getTask(@PathVariable("id") int id) throws TaskNotFoundException {
        return taskService.getTaskById(id);
    }

    @DeleteMapping("/task/{id}")
    private void deleteTask(@PathVariable("id") int id) {
        taskService.delete(id);
    }

    @PostMapping("/task")
    private int saveTask(@RequestBody Task task) {
        taskService.saveOrUpdate(task);
        return task.getId();
    }

   @PostMapping("/task/complete")
   private void updateComplete(@RequestBody Task task) {
        taskService.updateTaskCompleted(task);
   }
}