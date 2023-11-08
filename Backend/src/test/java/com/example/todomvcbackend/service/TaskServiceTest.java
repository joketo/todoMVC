package com.example.todomvcbackend.service;

import com.example.todomvcbackend.model.Task;
import com.example.todomvcbackend.repository.TaskRepository;
import com.example.todomvcbackend.testhelper.TestHelper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import static org.mockito.Mockito.when;

@SpringBootTest
public class TaskServiceTest {

    @MockBean
    private TaskRepository taskRepository;
    @Autowired
    private TaskService taskService;

    @Test
    void getAllShouldReturnTasksIfExists() {
        Task task = TestHelper.createTaskWithDescription("Write some code");
        when(taskRepository.findAll()).thenReturn(List.of(task));

        List<Task> returnedTask = taskService.getAll();

        assertThat(returnedTask.size()).isNotEqualTo(0);
        assertThat(returnedTask.get(0).getDescription()).isEqualTo("Write some code");
    }

}