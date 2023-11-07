package com.example.todomvcbackend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.todomvcbackend.model.Task;
import com.example.todomvcbackend.model.TaskInput;
import com.example.todomvcbackend.repository.TaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/**
 * Service that handles communication with the TaskRepository
 */
@Service
public class TaskService {
    @Autowired
    TaskRepository taskRepository;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public List<Task> getAll() {
        List<Task> tasks = new ArrayList<>();
        taskRepository.findAll().forEach(tasks::add);
        return tasks;
    }

    public Task getTaskById(long id) throws ResponseStatusException {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "entity not found"
            );
        }
        return task.get();
    }

    public Task save(TaskInput task) {
        Task newTask = new Task();
        newTask.setDescription(task.getDescription());
        newTask.setCompleted(task.isCompleted());
        Task savedTask = taskRepository.save(newTask);
        logger.info("Saved new task with info: " + savedTask);
        return savedTask;
    }

    public Task updateTaskCompleted(long taskId) {
        Optional<Task> oldState = taskRepository.findById(taskId);
        if (oldState.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "entity not found"
            );
        }
        oldState.get().setCompleted(!oldState.get().isCompleted());
        Task savedTask = taskRepository.save(oldState.get());
        logger.info("Updated task with info: " + savedTask);
        return savedTask;
    }

    public void delete(long id) {
        taskRepository.deleteById(id);
        logger.info("Deleted task with id " + id);
    }
}