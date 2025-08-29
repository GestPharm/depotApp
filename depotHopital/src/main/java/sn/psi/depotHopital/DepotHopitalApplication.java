package sn.psi.depotHopital;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@ComponentScan(basePackages = "sn.psi.depotHopital, sn.psi.depotHopital.config, sn.psi.depotHopital.utils")
@EnableAutoConfiguration
public class DepotHopitalApplication {

	public static void main(String[] args) {
		SpringApplication.run(DepotHopitalApplication.class, args);
	}



}
