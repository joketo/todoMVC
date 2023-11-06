package com.example.todomvcbackend.controller;

import java.util.List;

import com.example.todomvcbackend.model.Task;
import com.example.todomvcbackend.model.TaskInput;
import com.example.todomvcbackend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 * Controller for API request for fetching, adding and editing tasks
 */
@RestController
public class TaskController {
    @Autowired
    TaskService taskService;

    @GetMapping("/task")
    public List<Task> getAllTasks() {
        return taskService.getAll();
    }

    @GetMapping("/task/{id}")
    public Task getTask(@PathVariable("id") long id) throws ResponseStatusException {
        return taskService.getTaskById(id);
    }

    @DeleteMapping("/task/{id}")
    public void deleteTask(@PathVariable("id") int id) {
        taskService.delete(id);
    }

    @PostMapping("/task")
    public Long saveTask(@RequestBody TaskInput task) {
        return taskService.save(task);
    }

   @PostMapping("/task/complete")
   public void updateComplete(@RequestBody Task task) {
        taskService.updateTaskCompleted(task.getId());
   }
}