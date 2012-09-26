package com.qaitdevlabs.qualityassessor.assessmentinvitation.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qaitdevlabs.qualityassessor.assessmentinvitation.dao.AssessmentInvitationDao;
import com.qaitdevlabs.qualityassessor.dto.AssessmentRequestDTO;
import com.qaitdevlabs.qualityassessor.model.Assessment;
import com.qaitdevlabs.qualityassessor.model.AssessmentInvitation;
import com.qaitdevlabs.qualityassessor.model.User;

@Service
public class AssessmentInvitationServiceImpl implements
		AssessmentInvitationService {

	private AssessmentInvitationDao assessmentInvitationDao;

	@Autowired
	public void setAssessmentInvitationDao(
			AssessmentInvitationDao assessmentInvitationDao) {
		this.assessmentInvitationDao = assessmentInvitationDao;
	}

	@Override
	public void sendInvitation(AssessmentInvitation assessmentInvitation) {
		//sending email funtionality
		assessmentInvitationDao.saveOrUpdateAssessmentInvitation(assessmentInvitation);

	}
	
	@Override
	public void saveOrUpdateInvitation(AssessmentInvitation assessmentInvitation) {
		assessmentInvitationDao.saveOrUpdateAssessmentInvitation(assessmentInvitation);

	}

	@Override
	public List<AssessmentRequestDTO> getAssessmentInvitations(User assessor,boolean isIgnore) {
		List<AssessmentRequestDTO> listOfAssessmentRequests = null;
		List<AssessmentInvitation> list = assessmentInvitationDao
				.getAssessmentInvitations(assessor , isIgnore);
		if (list != null && list.size() > 0) {
			listOfAssessmentRequests = new ArrayList<AssessmentRequestDTO>();
			Iterator<AssessmentInvitation> it = list.iterator();
			while (it.hasNext()) {
				AssessmentInvitation invitation = it.next();
				AssessmentRequestDTO dto = new AssessmentRequestDTO();
				dto.setDomainName(invitation.getDomain().getDomainName());
				dto.setUserCompleteName(invitation.getUser().getFirstName()
						+ " " + invitation.getUser().getLastName());
				Date invitationDate = invitation.getInvitationDate();
				SimpleDateFormat dateFormat = new SimpleDateFormat(
						"EEE, MMM d, yyyy");
				String invitationFormatedDate = dateFormat
						.format(invitationDate);
				dto.setInvitationDate(invitationFormatedDate);
				dto.setDomainId(invitation.getDomain().getDomainId());
				dto.setUserId(invitation.getUser().getUserId());
				dto.setInvitationId(invitation.getAssessmentInvitationId());
				listOfAssessmentRequests.add(dto);
			}
		}
		return listOfAssessmentRequests;
	}

	@Override
	public AssessmentInvitation getAssessmentInvitation(String invitationKey) {
		if (invitationKey != null) {
			Long invitationId = Long.valueOf(invitationKey);
			return assessmentInvitationDao.get(invitationId);
		}
		return null;
	}

}
