package com.example.todomvcbackend.repository;

import com.example.todomvcbackend.model.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Long> {
}