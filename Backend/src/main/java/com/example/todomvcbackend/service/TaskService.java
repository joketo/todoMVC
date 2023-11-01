package com.example.todomvcbackend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.todomvcbackend.exceptions.TaskNotFoundException;
import com.example.todomvcbackend.model.Task;
import com.example.todomvcbackend.repository.TaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Task getTaskById(int id) throws TaskNotFoundException {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isEmpty()) {
            throw new TaskNotFoundException("Task could not be found with id " + id);
        }
        return task.get();
    }

    public void saveOrUpdate(Task task) {
        Task savedTask = taskRepository.save(task);
        logger.info("Saved task with info: " + savedTask);
    }

    public void updateTaskCompleted(Task task) {
        Optional<Task> oldState = taskRepository.findById(task.getId());
        if (oldState.isPresent()) {
            oldState.get().setCompleted(!oldState.get().isCompleted());
            Task savedTask = taskRepository.save(oldState.get());
            logger.info("Saved task with info: " + savedTask);

        }
    }

    public void delete(int id) {
        taskRepository.deleteById(id);
        logger.info("Deleted task with id " + id);
    }
}