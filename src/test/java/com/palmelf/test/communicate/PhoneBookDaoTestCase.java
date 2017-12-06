package com.palmelf.test.communicate;

import com.palmelf.eoffice.dao.communicate.PhoneBookDao;
import com.palmelf.test.BaseTestCase;

import flexjson.JSONSerializer;
import java.util.List;
import javax.annotation.Resource;
import org.junit.Test;

public class PhoneBookDaoTestCase extends BaseTestCase {

	@Resource
	private PhoneBookDao phoneBookDao;

	@Override
	@Test
	public void test() {
		List phoneBook = this.phoneBookDao.getAll();

		JSONSerializer serializer = new JSONSerializer();
		serializer.serialize(phoneBook);
		System.out.println("josn:"
				+ serializer.exclude(
						new String[] { "class", "phoneGroup",
								"appUser.department" }).prettyPrint(true));
	}
}
