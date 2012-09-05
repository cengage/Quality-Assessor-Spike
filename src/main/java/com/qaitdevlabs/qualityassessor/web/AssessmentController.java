package com.qaitdevlabs.qualityassessor.web;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qaitdevlabs.qualityassessor.assessment.service.AssessmentService;
import com.qaitdevlabs.qualityassessor.domain.service.DomainService;
import com.qaitdevlabs.qualityassessor.dto.DomainDTO;
import com.qaitdevlabs.qualityassessor.dto.TreeNodeDTO;
import com.qaitdevlabs.qualityassessor.model.Assessment;
import com.qaitdevlabs.qualityassessor.model.Domain;
import com.qaitdevlabs.qualityassessor.model.User;
import com.qaitdevlabs.qualityassessor.service.UserService;

@Controller
public class AssessmentController {

	private AssessmentService assessmentService;

	@Autowired
	public void setAssessmentService(AssessmentService assessmentService) {
		this.assessmentService = assessmentService;
	}

	private UserService userService;

	@Autowired
	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	private DomainService domainService;

	@Autowired
	public void setDomainService(DomainService domainService) {
		this.domainService = domainService;
	}

	@RequestMapping(value = "/assessment", method = RequestMethod.GET)
	public String getListOfRootDomains(ModelMap map) {
		List<DomainDTO> listOfRootDomains = domainService
				.getListOfRootDomains();
		map.addAttribute("listOfRootDomains", listOfRootDomains);
		return "assessment";
	}

	@RequestMapping(value = "/domain", method = RequestMethod.GET)
	public String showDomainPage(ModelMap map) {
		return "domain";
	}

	@RequestMapping(value = "/rate", method = RequestMethod.GET)
	public String showRatePage(@RequestParam String key, ModelMap map,
			HttpServletRequest request) {
//		Long userId = (Long) request.getSession().getAttribute("USER_ID");
//		User assessor = userService.getUser(userId);
//		Domain domain = domainService.getDomain(key);
//		Assessment assessment = assessmentService.getAssessment(assessor,
//				assessor, domain);
//		if (assessment != null)
//			System.out.println(assessment.getScore());
//		else
//			System.out.println("not assessed yet");
		return "rate";
	}

	@RequestMapping(value = "/rate", method = RequestMethod.POST)
	public @ResponseBody
	long saveRating(@RequestParam String key, @RequestParam String id,
			@RequestParam String score, ModelMap map, HttpServletRequest request) {
		System.out.println("iddddddddddddddd" + id);
		Long userId = (Long) request.getSession().getAttribute("USER_ID");
		User assessor = userService.getUser(userId);
		Domain domain = domainService.getDomain(key);
		Long assessmentId = Long.valueOf(id);
		Date assessmentDate = new Date();
		Assessment assessment = new Assessment();
		assessment.setAssessmentId(assessmentId);
		assessment.setUser(assessor);
		assessment.setAssessor(assessor);
		assessment.setDomain(domain);
		assessment.setScore(Integer.valueOf(score));
		assessment.setAssessmentDate(assessmentDate);
		assessment = assessmentService.saveAssessment(assessment);
		assessmentId = assessment.getAssessmentId();
		return assessmentId;
	}

	@RequestMapping(value = "/domainHierarchy", method = RequestMethod.GET)
	public @ResponseBody
	TreeNodeDTO getDomainHierarchy(@RequestParam String key, ModelMap map,
			HttpServletRequest request) {
		Long userId = (Long) request.getSession().getAttribute("USER_ID");
		User assessor = userService.getUser(userId);
		TreeNodeDTO dto = domainService.getDomainHierarchy(Long.valueOf(key),
				assessor, assessor);
		return dto;
	}

}