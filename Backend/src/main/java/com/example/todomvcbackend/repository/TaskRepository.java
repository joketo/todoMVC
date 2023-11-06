package com.example.todomvcbackend.repository;

import com.example.todomvcbackend.model.Task;
import org.springframework.data.repository.CrudRepository;

/**
 * Repository for Tasks, extends CrudRepository Interface for generic CRUD operations
 */
public interface TaskRepository extends CrudRepository<Task, Long> {
}