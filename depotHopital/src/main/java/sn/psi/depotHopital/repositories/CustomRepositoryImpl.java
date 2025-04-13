package sn.psi.depotHopital.repositories;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;


public class CustomRepositoryImpl implements CustomRepository {

    @Autowired
    private EntityManager entityManager;


}
