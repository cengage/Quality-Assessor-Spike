package com.qaitdevlabs.qualityassessor.domain.service;

import java.util.List;
import com.qaitdevlabs.qualityassessor.dto.DomainDTO;
import com.qaitdevlabs.qualityassessor.dto.RadarChartInfo;
import com.qaitdevlabs.qualityassessor.dto.TreeNodeDTO;
import com.qaitdevlabs.qualityassessor.model.User;
import com.qaitdevlabs.qualityassessor.model.Domain;

/**
 * This service interface is used to handle request from controller for saving,
 * updating ,deleting domains and to get child domains.
 * 
 * @author anujchhabra
 * 
 */
public interface DomainService {

	/**
	 * This method get list of child domains corresponding to parent key
	 * 
	 * @param key
	 *            parent key
	 * @return domain list
	 */
	public List<TreeNodeDTO> getDomainList(String key);

	/**
	 * This method update domain
	 * 
	 * @param dto
	 *            data transfer object of domain
	 */
	public void updateDomain(TreeNodeDTO dto);

	/**
	 * This method is used to save new domain
	 * 
	 * @param dto
	 *            data transfer object of domain
	 * @return data transfer object of saved domain
	 */
	public TreeNodeDTO saveDomain(TreeNodeDTO dto, User user);

	/**
	 * This method is used to delete domain
	 * 
	 * @param parentKey
	 *            parent key
	 * @param key
	 *            key
	 * @return true if domain deleted successfully otherwise retrun false
	 */
	public boolean deleteDomain(String parentKey, String key);

	/**
	 * This method is used to get remaining weightage in domain
	 * 
	 * @param domainKey
	 *            parent key of domain
	 * @return remaining weightage
	 */
	public int getRemainingWeightageInDomain(String domainKey);

	/**
	 * This method is used to get subdomains
	 * 
	 * @return list of subdomains
	 */
	public List<DomainDTO> getSubDomains(String key);

	public List<DomainDTO> getListOfRootDomains();

	public TreeNodeDTO getDomainHierarchy(Long id, User assessor, User user,float score);

	public Domain getDomain(String key);

	public void getExtremeChildDomains(Long id, User user, User assessor,
			List<RadarChartInfo> extrmeChilds);
}
